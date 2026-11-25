import aluminiumDarkUrl from '@ovhcloud/ods-themes/aluminium-dark/css?url';
import blueJeansUrl from '@ovhcloud/ods-themes/blue-jeans/css?url';
import blueJeansDarkUrl from '@ovhcloud/ods-themes/blue-jeans-dark/css?url';
import aluminiumUrl from '@ovhcloud/ods-themes/default/css?url';
import * as React from 'react';
// The white label is not in a published @ovhcloud/ods-themes yet: these are copies of its build
// (ovh/design-system#1181). Once it is published, import '@ovhcloud/ods-themes/white-label/css?url'
// and 'white-label-dark/css?url' instead and delete src/themes/.
import whiteLabelUrl from '../themes/white-label/light.css?url';
import whiteLabelDarkUrl from '../themes/white-label/dark.css?url';
// Terminal is Beacon's terminal theme (https://beacon.ovhcloud.tools/) mapped onto the ODS tokens, with a light mode
// Beacon doesn't have.
import terminalDarkUrl from '../themes/terminal/dark.css?url';
import terminalUrl from '../themes/terminal/light.css?url';
// Hackathon is the OVHcloud hackathon page's look, from its computed styles, with a light mode the page doesn't have.
import hackathonDarkUrl from '../themes/hackathon/dark.css?url';
import hackathonUrl from '../themes/hackathon/light.css?url';
// Black Friday is the OVHcloud Black Friday page's look, from its computed styles: its dark deal sections and
// its white offer tiles.
import blackFridayDarkUrl from '../themes/black-friday/dark.css?url';
import blackFridayUrl from '../themes/black-friday/light.css?url';

export type Theme = 'aluminium' | 'blue-jeans' | 'white-label' | 'terminal' | 'hackathon' | 'black-friday';
export type Mode = 'auto' | 'light' | 'dark';

const THEME_URLS: Record<Theme, Record<Exclude<Mode, 'auto'>, string>> = {
  aluminium: { light: aluminiumUrl, dark: aluminiumDarkUrl },
  'blue-jeans': { light: blueJeansUrl, dark: blueJeansDarkUrl },
  'white-label': { light: whiteLabelUrl, dark: whiteLabelDarkUrl },
  terminal: { light: terminalUrl, dark: terminalDarkUrl },
  hackathon: { light: hackathonUrl, dark: hackathonDarkUrl },
  'black-friday': { light: blackFridayUrl, dark: blackFridayDarkUrl },
};

const THEMES = Object.keys(THEME_URLS) as Theme[];
const MODES: Mode[] = ['auto', 'light', 'dark'];
const THEME_STORAGE_KEY = 'ods-showcase-theme';
const MODE_STORAGE_KEY = 'ods-showcase-mode';
const THEME_PARAM = 'theme';
const MODE_PARAM = 'mode';
const DEFAULT_THEME: Theme = 'white-label';
const DEFAULT_MODE: Mode = 'auto';
const DARK_QUERY = '(prefers-color-scheme: dark)';

interface ThemeChoice {
  theme: Theme;
  mode: Mode;
}

const isTheme = (value: string | null): value is Theme => THEMES.includes(value as Theme);
const isMode = (value: string | null): value is Mode => MODES.includes(value as Mode);

/**
 * Reads a `theme` value, also accepting the former single-value form (`aluminium-dark`, `auto`)
 * so older links and stored choices keep working: it then carries the mode too.
 */
const parseTheme = (value: string | null): Partial<ThemeChoice> => {
  if (!value) {
    return {};
  }
  if (isTheme(value)) {
    return { theme: value };
  }
  if (value === 'auto') {
    return { mode: 'auto' };
  }
  const base = value.replace(/-dark$/, '');
  return base !== value && isTheme(base) ? { theme: base, mode: 'dark' } : {};
};

const readParams = (params: URLSearchParams): Partial<ThemeChoice> => {
  const parsed = parseTheme(params.get(THEME_PARAM));
  const mode = params.get(MODE_PARAM);
  return isMode(mode) ? { ...parsed, mode } : parsed;
};

/** `?theme=&mode=` in the query string, or in the hash route's query (`#/page?theme=`). */
const readUrlChoice = (): Partial<ThemeChoice> => {
  const hashQuery = window.location.hash.split('?')[1] ?? '';
  return { ...readParams(new URLSearchParams(hashQuery)), ...readParams(new URLSearchParams(window.location.search)) };
};

const readStoredChoice = (): Partial<ThemeChoice> => {
  try {
    const parsed = parseTheme(localStorage.getItem(THEME_STORAGE_KEY));
    const mode = localStorage.getItem(MODE_STORAGE_KEY);
    return isMode(mode) && parsed.mode === undefined ? { ...parsed, mode } : parsed;
  } catch {
    return {};
  }
};

/** The URL wins, so a shared link shows the theme it names; then the remembered choice; then the defaults. */
const readInitialChoice = (): ThemeChoice => {
  const fromUrl = readUrlChoice();
  const stored = readStoredChoice();
  return {
    theme: fromUrl.theme ?? stored.theme ?? DEFAULT_THEME,
    mode: fromUrl.mode ?? stored.mode ?? DEFAULT_MODE,
  };
};

/** Keeps `?theme=&mode=` in the query string in step with the choice, so the address can be shared as is. */
const writeUrlChoice = ({ theme, mode }: ThemeChoice): void => {
  const url = new URL(window.location.href);
  if (url.searchParams.get(THEME_PARAM) === theme && url.searchParams.get(MODE_PARAM) === mode) {
    return;
  }
  url.searchParams.set(THEME_PARAM, theme);
  url.searchParams.set(MODE_PARAM, mode);
  // Keep the router's history state: the hash router stores its index there.
  window.history.replaceState(window.history.state, '', url);
};

const storeChoice = ({ theme, mode }: ThemeChoice): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    localStorage.setItem(MODE_STORAGE_KEY, mode);
  } catch {
    // Storage unavailable (private mode…): the choice just isn't remembered.
  }
};

const THEME_LINK_ID = 'ods-theme';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const resolveMode = (mode: Mode): Exclude<Mode, 'auto'> =>
  mode === 'auto' ? (window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light') : mode;

const resolveThemeUrl = ({ theme, mode }: ThemeChoice): string =>
  new URL(THEME_URLS[theme][resolveMode(mode)], document.baseURI).href;

/**
 * A theme holds ODS tokens only, so the app tells the browser whether it is light or dark:
 * native scrollbars and form controls then match it.
 */
const applyColorScheme = (mode: Mode): void => {
  document.documentElement.style.colorScheme = resolveMode(mode);
};

const createThemeLink = (href: string): HTMLLinkElement => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  return link;
};

/** Bumped on every switch, so a slow stylesheet never replaces one picked after it. */
let switchId = 0;

/**
 * Applies a theme without an unstyled flash: the new stylesheet loads next to the current one
 * (inert, through a media that never matches), and only once it is ready does it replace it,
 * in a view transition cross-fade where the browser has them.
 */
const applyChoice = (choice: ThemeChoice): void => {
  const url = resolveThemeUrl(choice);
  const current = document.getElementById(THEME_LINK_ID) as HTMLLinkElement | null;
  if (current?.href === url) {
    return;
  }
  const id = ++switchId;

  // First theme: block on it straight away. It must come before the app styles, so they can override its tokens.
  if (!current) {
    const link = createThemeLink(url);
    link.id = THEME_LINK_ID;
    document.head.prepend(link);
    applyColorScheme(choice.mode);
    return;
  }

  const next = createThemeLink(url);
  next.media = 'not all';
  const swap = () => {
    if (id !== switchId) {
      next.remove();
      return;
    }
    next.media = '';
    current.removeAttribute('id');
    next.id = THEME_LINK_ID;
    current.remove();
    applyColorScheme(choice.mode);
  };
  const onReady = () => {
    if (id !== switchId) {
      next.remove();
      return;
    }
    if (!document.startViewTransition || window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      swap();
      return;
    }
    document.startViewTransition(swap);
  };
  next.addEventListener('load', onReady, { once: true });
  // A stylesheet that fails to load would leave the page unthemed: keep the current one.
  next.addEventListener('error', () => next.remove(), { once: true });
  current.after(next);
};

/** Fetches every other theme stylesheet once the page is idle, so switching to one is instant. */
const prefetchThemes = (): void => {
  const urls = new Set(THEMES.flatMap((theme) => Object.values(THEME_URLS[theme])));
  for (const href of urls) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'style';
    link.href = href;
    document.head.append(link);
  }
};

// Load the URL or stored theme as soon as this module runs, before React renders, to avoid an unthemed flash.
applyChoice(readInitialChoice());
// Safari has no requestIdleCallback.
if (typeof window.requestIdleCallback === 'function') {
  window.requestIdleCallback(prefetchThemes);
} else {
  setTimeout(prefetchThemes, 2000);
}

export const useTheme = () => {
  const [choice, setChoice] = React.useState<ThemeChoice>(readInitialChoice);
  React.useEffect(() => {
    const apply = () => applyChoice(choice);
    apply();
    writeUrlChoice(choice);
    storeChoice(choice);

    if (choice.mode !== 'auto') {
      return;
    }
    const media = window.matchMedia(DARK_QUERY);
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [choice]);

  const setTheme = React.useCallback((value: string) => {
    if (isTheme(value)) {
      setChoice((current) => ({ ...current, theme: value }));
    }
  }, []);
  const setMode = React.useCallback((value: string) => {
    if (isMode(value)) {
      setChoice((current) => ({ ...current, mode: value }));
    }
  }, []);

  return { theme: choice.theme, mode: choice.mode, setTheme, setMode };
};
