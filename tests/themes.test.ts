// Holds the showcase's own themes (src/themes) to the ODS theme contract, as the published
// @ovhcloud/ods-themes builds define it: a theme is ODS design tokens and nothing else.
// The same checks run on the published themes first, so the contract is theirs, not a guess.
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = join(__dirname, '..');
const ODS_THEMES = join(ROOT, 'node_modules/@ovhcloud/ods-themes/dist');
const ODS_REACT = join(ROOT, 'node_modules/@ovhcloud/ods-react/dist');
const SHOWCASE_THEMES = join(ROOT, 'src/themes');

interface Declaration {
  /** The selectors and at-rules around the declaration, outermost first. */
  context: string[];
  property: string;
  value: string;
}

interface Stylesheet {
  /** Statement at-rules (`@import …;`, `@layer a, b;`) and block at-rules, as `@name params`. */
  atRules: string[];
  declarations: Declaration[];
}

/** A small parser for the flat CSS the theme builds are: rules, nested at-rules, no strings holding braces. */
const parseCss = (css: string): Stylesheet => {
  const source = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const sheet: Stylesheet = { atRules: [], declarations: [] };
  let index = 0;

  const parseBlock = (context: string[]): void => {
    let buffer = '';
    while (index < source.length) {
      const char = source[index++];
      if (char === '{') {
        const prelude = buffer.trim();
        buffer = '';
        if (prelude.startsWith('@')) {
          sheet.atRules.push(prelude);
        }
        parseBlock([...context, prelude]);
      } else if (char === '}') {
        addStatement(buffer, context);
        return;
      } else if (char === ';' && !insideParentheses(buffer)) {
        addStatement(buffer, context);
        buffer = '';
      } else {
        buffer += char;
      }
    }
    addStatement(buffer, context);
  };

  const insideParentheses = (text: string): boolean =>
    (text.match(/\(/g)?.length ?? 0) > (text.match(/\)/g)?.length ?? 0);

  const addStatement = (statement: string, context: string[]): void => {
    const text = statement.trim();
    if (!text) {
      return;
    }
    if (text.startsWith('@')) {
      sheet.atRules.push(text);
      return;
    }
    const colon = text.indexOf(':');
    sheet.declarations.push({
      context,
      property: text.slice(0, colon).trim(),
      value: text.slice(colon + 1).trim()
    });
  };

  parseBlock([]);
  return sheet;
};

const listFiles = (directory: string, extension: string): string[] =>
  readdirSync(directory, { encoding: 'utf8', recursive: true })
    .filter((file) => file.endsWith(extension))
    .map((file) => join(directory, file));

const readSheet = (file: string): Stylesheet =>
  parseCss(readFileSync(file, 'utf8'));

/** The selector contexts an ODS theme declares tokens in. */
const isOdsContext = (context: string[]): boolean => {
  const [outer, inner, ...rest] = context;
  if (rest.length) {
    return false;
  }
  if (inner === undefined) {
    return outer === ':root';
  }
  if (outer === '@media (prefers-reduced-motion: reduce)') {
    return inner === ':root';
  }
  return (
    /^@layer ods-[a-z]+$/.test(outer) &&
    /^:root \[data-ods=[a-z-]+\]$/.test(inner)
  );
};

const isOdsAtRule = (atRule: string): boolean =>
  /^@layer ods-[a-z]+(, ods-[a-z]+)*$/.test(atRule) ||
  atRule === '@media (prefers-reduced-motion: reduce)';

// The tokens the ODS components read, and the ones they declare themselves.
const componentsRead = new Set<string>();
const componentsDeclare = new Set<string>();
for (const file of listFiles(ODS_REACT, '.css')) {
  const css = readFileSync(file, 'utf8');
  for (const [, name] of css.matchAll(/var\(\s*(--ods-[\w-]+)/g)) {
    componentsRead.add(name);
  }
  for (const [, name] of css.matchAll(/(--ods-[\w-]+)\s*:/g)) {
    componentsDeclare.add(name);
  }
}

const odsThemeFiles = listFiles(ODS_THEMES, '.css').filter((file) =>
  /\/(light|dark)\.css$/.test(file)
);
const showcaseThemeFiles = listFiles(SHOWCASE_THEMES, '.css');

// The contract: every token each published theme declares on :root.
const rootTokens = (sheet: Stylesheet): Set<string> =>
  new Set(
    sheet.declarations
      .filter(({ context }) => context.join() === ':root')
      .map(({ property }) => property)
  );
const odsRootTokens = odsThemeFiles.map((file) => rootTokens(readSheet(file)));
const contract = [...odsRootTokens[0]].filter((token) =>
  odsRootTokens.every((tokens) => tokens.has(token))
);

const checkTheme = (file: string) => {
  const sheet = readSheet(file);
  const declared = new Set(sheet.declarations.map(({ property }) => property));

  it('only uses the at-rules of an ODS theme (no @import, no @font-face)', () => {
    expect(sheet.atRules.filter((atRule) => !isOdsAtRule(atRule))).toEqual([]);
  });

  it('only declares custom properties', () => {
    const raw = sheet.declarations.filter(
      ({ property }) => !property.startsWith('--')
    );
    expect(
      raw.map(
        ({ context, property }) => `${context.join(' > ')} { ${property} }`
      )
    ).toEqual([]);
  });

  it('only declares ODS tokens', () => {
    expect(
      [...declared].filter((property) => !property.startsWith('--ods-'))
    ).toEqual([]);
  });

  it('declares them in the selectors of an ODS theme', () => {
    const outside = sheet.declarations.filter(
      ({ context }) => !isOdsContext(context)
    );
    expect(
      outside.map(
        ({ context, property }) => `${context.join(' > ')} { ${property} }`
      )
    ).toEqual([]);
  });

  it('defines every token of the ODS theme contract', () => {
    expect(contract.length).toBeGreaterThan(250);
    expect(contract.filter((token) => !rootTokens(sheet).has(token))).toEqual(
      []
    );
  });

  it('only sets component tokens the ODS components read', () => {
    const componentTokens = [...declared].filter(
      (token) => !/^--ods-(palette|semantic)-/.test(token)
    );
    expect(
      componentTokens.filter((token) => !componentsRead.has(token))
    ).toEqual([]);
  });

  it('only refers to tokens it defines', () => {
    const referenced = sheet.declarations.flatMap(({ value }) =>
      [...value.matchAll(/var\(\s*(--[\w-]+)\s*(,)?/g)]
        .filter(([, , fallback]) => !fallback)
        .map(([, name]) => name)
    );
    expect(
      [...new Set(referenced)].filter(
        (name) => !declared.has(name) && !componentsDeclare.has(name)
      )
    ).toEqual([]);
  });
};

describe('ODS theme contract', () => {
  it('finds the published themes and the showcase themes', () => {
    expect(odsThemeFiles).toHaveLength(4);
    expect(showcaseThemeFiles.length).toBeGreaterThanOrEqual(6);
  });

  for (const file of [...odsThemeFiles, ...showcaseThemeFiles]) {
    describe(relative(ROOT, file), () => checkTheme(file));
  }
});
