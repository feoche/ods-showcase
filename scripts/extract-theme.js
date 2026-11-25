/* Theme extractor: paste in the DevTools console of the page to copy. It copies a JSON to the clipboard
   and downloads it as theme-<host>.json. Scroll the page to the bottom first so lazy sections render.
   It reads the page as rendered: what sits on what, by area, not just which colours exist. */
(() => {
  const MAX = 20;
  const cs = (el) => getComputedStyle(el);
  const vw = innerWidth,
    vh = innerHeight;
  const docH = document.documentElement.scrollHeight;

  // ---------- helpers ----------
  const parse = (c) => {
    const m = c?.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const [r, g, b, a = 1] = m[1]
      .split(/[ ,/]+/)
      .filter(Boolean)
      .map(Number);
    return { a, b, g, r };
  };
  const hex = (c) => {
    const p = typeof c === 'string' ? parse(c) : c;
    if (!p) return c;
    const h = [p.r, p.g, p.b]
      .map((v) => Math.round(v).toString(16).padStart(2, '0'))
      .join('');
    return `#${h}${
      p.a < 1
        ? Math.round(p.a * 255)
            .toString(16)
            .padStart(2, '0')
        : ''
    }`;
  };
  const hexAll = (s) => (s || '').replace(/rgba?\([^)]+\)/g, (m) => hex(m));
  const lum = ({ r, g, b }) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const contrast = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
    return +((x + 0.05) / (y + 0.05)).toFixed(2);
  };
  const blend = (top, under) => ({
    a: 1,
    b: top.b * top.a + under.b * (1 - top.a),
    g: top.g * top.a + under.g * (1 - top.a),
    r: top.r * top.a + under.r * (1 - top.a)
  });
  const gradStops = (img) => (img.match(/rgba?\([^)]+\)/g) || []).map(parse);
  const avg = (cols) =>
    cols.reduce(
      (s, c) => ({
        a: 1,
        b: s.b + c.b / cols.length,
        g: s.g + c.g / cols.length,
        r: s.r + c.r / cols.length
      }),
      { a: 1, b: 0, g: 0, r: 0 }
    );
  const area = (r) =>
    Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0)) *
    Math.max(0, r.height);
  const cls = (el) =>
    (el.className?.baseVal ?? el.className ?? '')
      .toString()
      .trim()
      .split(/\s+/)
      .slice(0, 3)
      .join('.');
  const label = (el) =>
    `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ''}${cls(el) ? `.${cls(el)}` : ''}`.slice(
      0,
      80
    );
  const text = (el) =>
    (el.innerText || el.textContent || '')
      .trim()
      .replace(/\s+/g, ' ')
      .slice(0, 50);
  const tally = () => {
    const m = new Map();
    return {
      add: (k, w = 1) => k && m.set(k, (m.get(k) || 0) + w),
      top: (n = MAX) =>
        [...m]
          .sort((a, b) => b[1] - a[1])
          .slice(0, n)
          .map(([k, w]) => [k, Math.round(w)])
    };
  };

  // ---------- skip consent banners, chat widgets and full-screen overlays ----------
  const NOISE =
    /didomi|cookie|consent|onetrust|axeptio|tarteaucitron|gdpr|cmp|chat-widget|intercom|zendesk/i;
  const noisy = new Set();
  for (const el of document.querySelectorAll('body *')) {
    const s = cs(el),
      r = el.getBoundingClientRect();
    if (
      NOISE.test(`${el.id} ${cls(el)}`) ||
      (s.position === 'fixed' && r.width >= vw * 0.9 && r.height >= vh * 0.9)
    )
      noisy.add(el);
  }
  const isNoise = (el) => {
    for (let e = el; e; e = e.parentElement) if (noisy.has(e)) return true;
    return false;
  };
  const visible = (el) => {
    const r = el.getBoundingClientRect(),
      s = cs(el);
    return (
      r.width > 0 &&
      r.height > 0 &&
      s.visibility !== 'hidden' &&
      s.display !== 'none' &&
      +s.opacity > 0.05 &&
      !isNoise(el)
    );
  };
  const all = [...document.querySelectorAll('body *')].filter(visible);

  // ---------- the surface each element really sits on ----------
  const ownPaint = (el) => {
    const s = cs(el);
    const bg = parse(s.backgroundColor);
    const img = s.backgroundImage !== 'none' ? s.backgroundImage : null;
    const stops = img?.includes('gradient') ? gradStops(img) : [];
    if (stops.length)
      return {
        color: blend(avg(stops), bg?.a ? bg : { a: 1, b: 255, g: 255, r: 255 }),
        css: hexAll(img).slice(0, 160),
        kind: 'gradient'
      };
    if (img?.includes('url('))
      return {
        color: bg?.a ? bg : null,
        css: img.slice(0, 120),
        kind: 'image'
      };
    if (bg && bg.a > 0) return { color: bg, kind: 'color' };
    return null;
  };
  const cache = new Map();
  const surfaceOf = (el) => {
    if (cache.has(el)) return cache.get(el);
    let result = null;
    const layers = [];
    for (let e = el; e; e = e.parentElement) {
      const p = ownPaint(e);
      if (p) {
        layers.push({ e, p });
        if (p.color && p.color.a >= 1) break;
      }
    }
    let color = { a: 1, b: 255, g: 255, r: 255 };
    const solid = layers.findLast((l) => l.p.color && l.p.color.a >= 1);
    if (solid) color = solid.p.color;
    for (const l of layers
      .slice(0, solid ? layers.indexOf(solid) : layers.length)
      .reverse())
      if (l.p.color) color = blend(l.p.color, color);
    const top = layers[0];
    result = {
      by: top ? label(top.e) : 'html (default white)',
      css: top?.p.css,
      hex: hex(color),
      kind: top?.p.kind ?? 'color',
      rgb: color
    };
    cache.set(el, result);
    return result;
  };
  const isDark = (c) => lum(c) < 0.18;

  // ---------- 1. surfaces by visible area, and the inks used on each ----------
  const surfaces = new Map();
  const painted = all.filter((el) => ownPaint(el));
  const paintedSet = new Set(painted);
  // The area a surface leaves showing: its own, minus the painted boxes laid directly on it.
  const exposed = (el) => {
    let covered = 0;
    const visit = (node) => {
      for (const k of node.children) {
        if (paintedSet.has(k)) covered += area(k.getBoundingClientRect());
        else visit(k);
      }
    };
    visit(el);
    return Math.max(0, area(el.getBoundingClientRect()) - covered);
  };
  for (const el of [document.body, ...painted]) {
    const s = surfaceOf(el);
    const key = s.kind === 'gradient' ? s.css : s.hex;
    const entry = surfaces.get(key) || {
      area: 0,
      average: s.hex,
      border: tally(),
      count: 0,
      dark: isDark(s.rgb),
      example: label(el),
      inks: tally(),
      radius: tally(),
      shadow: tally(),
      surface: key
    };
    entry.area += exposed(el);
    entry.count++;
    const st = cs(el);
    entry.radius.add(st.borderRadius !== '0px' && st.borderRadius);
    entry.shadow.add(st.boxShadow !== 'none' && hexAll(st.boxShadow));
    entry.border.add(
      st.borderTopWidth !== '0px' &&
        st.borderTopStyle !== 'none' &&
        `${st.borderTopWidth} ${hex(st.borderTopColor)}`
    );
    surfaces.set(key, entry);
  }
  // Text inks, weighted by characters, on the surface under them.
  const textEls = all.filter((el) =>
    [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
  );
  const pairs = tally();
  for (const el of textEls) {
    const s = surfaceOf(el),
      st = cs(el);
    const ink = parse(st.color);
    const chars = [...el.childNodes]
      .filter((n) => n.nodeType === 3)
      .reduce((n, t) => n + t.textContent.trim().length, 0);
    const key = s.kind === 'gradient' ? s.css : s.hex;
    surfaces.get(key)?.inks.add(`${hex(st.color)} ${st.fontWeight}`, chars);
    if (ink)
      pairs.add(
        `${hex(st.color)} on ${s.hex} (contrast ${contrast(blend(ink, s.rgb), s.rgb)})`,
        chars
      );
  }
  const totalArea = [...surfaces.values()].reduce((n, s) => n + s.area, 0) || 1;
  const surfaceList = [...surfaces.values()]
    .sort((a, b) => b.area - a.area)
    .slice(0, 15)
    .map((s) => ({
      average: s.average,
      border: s.border.top(3),
      dark: s.dark,
      elements: s.count,
      example: s.example,
      inks: s.inks.top(6),
      radius: s.radius.top(3),
      shadow: s.shadow.top(2),
      share: `${((s.area / totalArea) * 100).toFixed(1)}%`,
      surface: s.surface
    }));

  // ---------- 2. page outline, top to bottom: the big blocks and what they hold ----------
  const blocks = all.filter((el) => {
    const r = el.getBoundingClientRect();
    return (
      r.width >= vw * 0.6 &&
      r.height >= 80 &&
      (ownPaint(el) ||
        /^(header|nav|main|section|footer|aside)$/i.test(el.tagName))
    );
  });
  const outline = blocks
    // Drop a block that only repeats the one around it: same surface, or the same box.
    .filter(
      (el) =>
        !blocks.some(
          (o) =>
            o !== el &&
            o.contains(el) &&
            (Math.abs(
              o.getBoundingClientRect().height -
                el.getBoundingClientRect().height
            ) < 12 ||
              (surfaceOf(o).css === surfaceOf(el).css &&
                surfaceOf(o).hex === surfaceOf(el).hex))
        )
    )
    .sort(
      (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
    )
    .slice(0, 40)
    .map((el) => {
      const r = el.getBoundingClientRect(),
        st = cs(el),
        s = surfaceOf(el);
      const kids = [...el.querySelectorAll('*')].filter(
        (k) =>
          visible(k) &&
          ownPaint(k) &&
          k.getBoundingClientRect().width > 120 &&
          k.getBoundingClientRect().height > 60 &&
          surfaceOf(k).hex !== s.hex &&
          !blocks.includes(k)
      );
      const kidKinds = tally();
      kids.forEach((k) => {
        const ks = cs(k);
        kidKinds.add(
          `${surfaceOf(k).hex} r=${ks.borderRadius} shadow=${ks.boxShadow !== 'none'}`
        );
      });
      const h = el.querySelector('h1,h2,h3');
      return {
        block: label(el),
        dark: isDark(s.rgb),
        heading: h ? text(h) : undefined,
        height: Math.round(r.height),
        holds: kidKinds.top(3),
        position: st.position !== 'static' ? st.position : undefined,
        surface: s.kind === 'gradient' ? s.css : s.hex,
        y: Math.round(r.top + scrollY)
      };
    });

  // ---------- 3. type, by role, with the surface it sits on ----------
  const typeOf = (el) => {
    const st = cs(el);
    return {
      color: hex(st.color),
      font: st.fontFamily.split(',')[0].replace(/["']/g, ''),
      lineHeight: st.lineHeight,
      on: surfaceOf(el).hex,
      size: st.fontSize,
      text: text(el),
      tracking: st.letterSpacing !== 'normal' ? st.letterSpacing : undefined,
      transform: st.textTransform !== 'none' ? st.textTransform : undefined,
      weight: st.fontWeight
    };
  };
  const biggest = textEls
    .map((el) => [el, parseFloat(cs(el).fontSize)])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([el]) => typeOf(el));
  const families = tally();
  textEls.forEach((el) =>
    families.add(
      cs(el).fontFamily.split(',')[0].replace(/["']/g, ''),
      text(el).length
    )
  );
  const sizes = tally();
  textEls.forEach((el) =>
    sizes.add(`${cs(el).fontSize}/${cs(el).fontWeight}`, text(el).length)
  );
  const sample = (sel, n = 3) => {
    const seen = new Map();
    for (const el of all.filter((e) => e.matches(sel))) {
      const t = typeOf(el);
      const k = JSON.stringify({ ...t, text: '' });
      if (!seen.has(k)) seen.set(k, { ...t, count: 0 });
      seen.get(k).count++;
    }
    return [...seen.values()].sort((a, b) => b.count - a.count).slice(0, n);
  };
  const type = {
    body: sample('p, li', 4),
    families: families.top(6),
    h1: sample('h1'),
    h2: sample('h2'),
    h3: sample('h3'),
    h4: sample('h4'),
    largest: biggest,
    links: sample(
      'a:not([role=button]):not([class*=btn]):not([class*=button]):not([class*=cta])',
      4
    ),
    mono: all
      .filter(
        (el) =>
          /mono|code|courier|consolas/i.test(cs(el).fontFamily) && text(el)
      )
      .slice(0, 4)
      .map(typeOf),
    scale: sizes.top(12),
    strikethrough: all
      .filter((el) => cs(el).textDecorationLine.includes('line-through'))
      .slice(0, 4)
      .map(typeOf)
  };

  // ---------- 4. buttons and other controls, grouped by the surface they sit on ----------
  const PROPS = [
    'color',
    'background-color',
    'background-image',
    'border-top',
    'border-radius',
    'box-shadow',
    'font-size',
    'font-weight',
    'text-transform',
    'letter-spacing',
    'padding',
    'height'
  ];
  const styleOf = (el) => {
    const st = cs(el),
      o = {};
    PROPS.forEach((p) => {
      const v = st.getPropertyValue(p);
      if (v && !/^(none|normal|0px|auto|rgba\(0, 0, 0, 0\))$/.test(v))
        o[p] = hexAll(v);
    });
    return o;
  };
  const grouped = (sel, n = 6) => {
    const m = new Map();
    for (const el of all.filter((e) => e.matches(sel))) {
      const s = surfaceOf(el.parentElement || el),
        style = styleOf(el);
      const k = JSON.stringify([isDark(s.rgb), style]);
      if (!m.has(k))
        m.set(k, {
          count: 0,
          on: `${s.hex} (${isDark(s.rgb) ? 'dark' : 'light'})`,
          style,
          text: text(el)
        });
      m.get(k).count++;
    }
    return [...m.values()].sort((a, b) => b.count - a.count).slice(0, n);
  };
  const controls = {
    alerts: grouped(
      '[role=alert], [role=status], [class*=alert], [class*=notice], [class*=toast]',
      4
    ),
    badges: grouped(
      '[class*=badge], [class*=tag]:not(html), [class*=chip], [class*=pill], [class*=ribbon], [class*=label]:not(label)',
      6
    ),
    buttons: grouped(
      'button, [role=button], a[class*=btn], a[class*=button], a[class*=cta], input[type=submit], input[type=button]',
      10
    ),
    checks: grouped(
      'input[type=checkbox], input[type=radio], [role=checkbox], [role=switch]',
      3
    ),
    code: grouped('pre, code, kbd', 3),
    inputs: grouped(
      'input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=hidden]), select, textarea'
    ),
    navActive: grouped(
      '[aria-current], [aria-selected=true], .active, [class*=--active], [class*=is-active]',
      6
    ),
    tables: grouped('th, td', 4),
    tabs: grouped('[role=tab], .nav-link, [class*=tab]:not(table)', 6)
  };

  // ---------- 5. cards: boxes that stand out from what they sit on ----------
  const cards = new Map();
  for (const el of painted) {
    const r = el.getBoundingClientRect();
    if (r.width < 140 || r.height < 80 || r.width > vw * 0.6) continue;
    const st = cs(el),
      own = surfaceOf(el),
      under = surfaceOf(el.parentElement || document.body);
    if (
      own.hex === under.hex &&
      st.boxShadow === 'none' &&
      st.borderTopWidth === '0px'
    )
      continue;
    const style = { ...styleOf(el), width: `${Math.round(r.width)}px` };
    const k = JSON.stringify([
      own.hex,
      under.hex,
      st.borderRadius,
      st.boxShadow,
      st.borderTop
    ]);
    if (!cards.has(k))
      cards.set(k, {
        count: 0,
        example: label(el),
        heading: text(el.querySelector('h2,h3,h4,strong') || el),
        inside: tally(),
        on: under.hex,
        style,
        surface: own.hex
      });
    const c = cards.get(k);
    c.count++;
    el.querySelectorAll('*').forEach((k2) => {
      if (visible(k2) && ownPaint(k2) && k2.getBoundingClientRect().width > 60)
        c.inside.add(`${surfaceOf(k2).hex} r=${cs(k2).borderRadius}`);
    });
  }
  const cardList = [...cards.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
    .map((c) => ({ ...c, inside: c.inside.top(4) }));

  // ---------- 6. imagery: logos, wordmarks, SVG colours in the top of the page ----------
  const svgColors = tally();
  document.querySelectorAll('svg *').forEach((n) => {
    if (isNoise(n)) return;
    const st = cs(n);
    [st.fill, st.stroke].forEach((c) => {
      const p = parse(c);
      if (p && p.a > 0) svgColors.add(hex(p));
    });
  });
  const hero = all
    .filter(
      (el) =>
        /^(img|svg|picture|video|canvas)$/i.test(el.tagName) &&
        el.getBoundingClientRect().top + scrollY < vh * 1.2 &&
        el.getBoundingClientRect().width > 80
    )
    .slice(0, 8)
    .map((el) => ({
      alt: el.getAttribute('alt') || el.getAttribute('aria-label') || undefined,
      el: label(el),
      on: surfaceOf(el.parentElement).hex,
      size: `${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`,
      src:
        (el.currentSrc || el.getAttribute('src') || '').slice(0, 140) ||
        undefined
    }));

  // ---------- 7. CSS rules for states, only those that match something on this page ----------
  const states = [],
    media = new Set(),
    faces = new Set(),
    blocked = [];
  const strip = (sel) =>
    sel
      .replace(
        /::?(hover|focus-visible|focus-within|focus|active|visited|disabled|checked|placeholder|selection|before|after|not\([^)]*\))/g,
        ''
      )
      .trim() || '*';
  const matchesPage = (selectorText) =>
    selectorText.split(',').some((s) => {
      try {
        return [...document.querySelectorAll(strip(s))].some((e) => visible(e));
      } catch {
        return false;
      }
    });
  const walk = (rules) => {
    for (const r of rules) {
      if (r instanceof CSSStyleRule) {
        if (
          states.length < 100 &&
          /:(hover|focus-visible|focus|active|disabled|checked)|::selection|::placeholder/.test(
            r.selectorText
          ) &&
          /color|background|border|shadow|outline|text-decoration/.test(
            r.style.cssText
          ) &&
          matchesPage(r.selectorText)
        )
          states.push(hexAll(r.cssText).replace(/\s+/g, ' ').slice(0, 300));
      } else if (r instanceof CSSMediaRule) {
        media.add(r.conditionText);
        walk(r.cssRules);
      } else if (r instanceof CSSFontFaceRule)
        faces.add(
          `${r.style.fontFamily} ${r.style.fontWeight || ''} ${r.style.fontStyle || ''}`.trim()
        );
      else if (r.cssRules) walk(r.cssRules);
    }
  };
  for (const sh of document.styleSheets) {
    try {
      walk(sh.cssRules);
    } catch {
      blocked.push(sh.href);
    }
  }

  // ---------- 8. design tokens the page declares (deduplicated, no -list/-contrasted copies) ----------
  const vars = {};
  for (const el of [document.documentElement, document.body]) {
    const st = cs(el);
    for (const p of st)
      if (p.startsWith('--') && !/-(list|contrasted)(-list)?$/.test(p))
        vars[p] = hexAll(st.getPropertyValue(p).trim()).slice(0, 120);
  }

  // ---------- 9. motion ----------
  const motion = tally();
  all.forEach((el) => {
    const t = cs(el).transition;
    if (t && !/^all 0s|^0s|^all$|^none/.test(t)) motion.add(t.slice(0, 80));
  });

  const out = {
    blockedStylesheets: blocked,
    breakpoints: [...media].slice(0, 20),
    cards: cardList,
    controls,
    cssVariables: vars,
    fonts: {
      faces: [...faces].slice(0, 20),
      links: [
        ...document.querySelectorAll(
          'link[href*="fonts."], link[href*="typekit"]'
        )
      ].map((l) => l.href),
      loaded: [
        ...new Set(
          [...document.fonts]
            .filter((f) => f.status === 'loaded')
            .map((f) => `${f.family} ${f.weight} ${f.style}`)
        )
      ]
    },
    howToRead:
      'surfaces: what the page is made of, by share of visible area, with the inks on each. outline: the page top to bottom. cards: boxes that stand out from what they sit on. controls: grouped by the surface they sit on (dark or light). Colours are hex; gradients keep their CSS and give an average.',
    imagery: {
      hero,
      iconFonts: [
        ...new Set(
          all
            .filter((e) => /icon|awesome|material/i.test(cs(e).fontFamily))
            .map((e) => cs(e).fontFamily.split(',')[0])
        )
      ].slice(0, 4),
      svgColors: svgColors.top(12)
    },
    motion: motion.top(8),
    outline,
    page: {
      colorScheme: cs(document.documentElement).colorScheme,
      height: docH,
      ignoredOverlays: [...noisy].slice(0, 5).map(label),
      lang: document.documentElement.lang,
      prefersDark: matchMedia('(prefers-color-scheme: dark)').matches,
      themeColor: document.querySelector('meta[name=theme-color]')?.content,
      title: document.title,
      url: location.href,
      viewport: `${vw}x${vh}`
    },
    radii: (() => {
      const t = tally();
      all.forEach((el) => {
        const r = cs(el).borderRadius;
        if (r !== '0px') t.add(r, area(el.getBoundingClientRect()) ** 0.5);
      });
      return t.top(8);
    })(),
    shadows: (() => {
      const t = tally();
      all.forEach((el) => {
        const s = cs(el).boxShadow;
        if (s !== 'none') t.add(hexAll(s), 1);
      });
      return t.top(6);
    })(),
    stateRules: states,
    surfaces: surfaceList,
    textOnSurface: pairs.top(15),
    type
  };

  const json = JSON.stringify(out, null, 1);
  const done = () =>
    console.log(
      `Theme extract copied (${(json.length / 1024).toFixed(0)} KB). Also downloaded as theme-${location.hostname}.json`
    );
  try {
    copy(json);
    done();
  } catch {
    navigator.clipboard
      ?.writeText(json)
      .then(done, () =>
        console.log('Clipboard blocked: use the downloaded file.')
      );
  }
  try {
    const a = Object.assign(document.createElement('a'), {
      download: `theme-${location.hostname}.json`,
      href: URL.createObjectURL(new Blob([json], { type: 'application/json' }))
    });
    document.body.append(a);
    a.click();
    a.remove();
  } catch {}
  console.log(out);
  return out;
})();
