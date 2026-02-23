import {Badge, Card, Spinner, Text} from '@ovhcloud/ods-react';
import * as React from 'react';
import {Navbar} from '../components/Navbar';
import {useTheme} from '../hooks/useTheme';

function parseColorToHex(raw: string): string | null {
  const color = raw.trim();
  if (!color) return null;
  if (color === 'white') return '#ffffff';
  if (color === 'black') return '#000000';
  if (/^#[0-9a-f]{6}$/i.test(color)) return color;
  // rgb(r, g, b) or rgb(r g b) — values may be floats
  const rgbMatch = color.match(/^rgb\(\s*(\d+(?:\.\d+)?)[,\s]+(\d+(?:\.\d+)?)[,\s]+(\d+(?:\.\d+)?)\s*\)/i);
  if (rgbMatch) {
    const r = Math.round(parseFloat(rgbMatch[1]));
    const g = Math.round(parseFloat(rgbMatch[2]));
    const b = Math.round(parseFloat(rgbMatch[3]));
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  }
  return null;
}

function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    const sRGB = val / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    }
    : {r: 0, g: 0, b: 0};
}

// Calculate contrast ratio between two colors
function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Get WCAG level based on contrast ratio
function getWCAGLevel(ratio: number): string {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA Large';
  return 'Fail';
}

interface ColorShade {
  level: string;
  hex: string;
}

interface ColorPalette {
  name: string;
  shades: string[];
}

interface ColorCombo {
  palette: string;
  backgroundShade: string;
  backgroundColor: string;
  textShade: string;
  textColor: string;
  contrastRatio: number;
  wcagLevel: string;
}

const SHADES = ['000', '025', '050', '075', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

interface PaletteShades {
  name: string;
  shades: Array<{ level: string; hex: string }>;
}

export const DesignTokens = () => {
  const [colorCombos, setColorCombos] = React.useState<ColorCombo[]>([]);
  const [paletteShades, setPaletteShades] = React.useState<PaletteShades[]>([]);
  const [wcagFilter, setWcagFilter] = React.useState<'AA' | 'AAA'>('AAA');
  const {theme, setTheme} = useTheme();

  React.useEffect(() => {
    // Double rAF: first frame lets the theme class apply, second ensures style recalc is committed
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => {
        const styles = getComputedStyle(document.querySelector('#root') as Element);

        // Define color palettes to test
        const palettes: ColorPalette[] = [
          {
            name: 'primary',
            shades: SHADES
          },
          {
            name: 'neutral',
            shades: SHADES
          },
          {
            name: 'information',
            shades: SHADES
          },
          {
            name: 'success',
            shades: SHADES
          },
          {
            name: 'warning',
            shades: SHADES
          },
          {
            name: 'critical',
            shades: SHADES
          },
        ];

        // Collect resolved shades per palette for the swatch header
        const resolvedPaletteShades: PaletteShades[] = palettes.map((palette) => ({
          name: palette.name,
          shades: palette.shades.flatMap((level) => {
            const raw = styles.getPropertyValue(`--ods-color-${palette.name}-${level}`);
            const hex = parseColorToHex(raw);
            return hex ? [{level, hex}] : [];
          }),
        }));

        setPaletteShades(resolvedPaletteShades);

        const combos: ColorCombo[] = [];

        // Find all valid AA or better combinations
        palettes.forEach((palette) => {
          const colors: ColorShade[] = resolvedPaletteShades.find(p => p.name === palette.name)?.shades ?? [];

          // Test all combinations within the palette
          for (let i = 0; i < colors.length; i++) {
            for (let j = 0; j < colors.length; j++) {
              if (i !== j) {
                const bg = colors[i];
                const text = colors[j];
                const ratio = getContrastRatio(bg.hex, text.hex);

                // Collect all combinations that meet at least AA (4.5:1)
                if (ratio >= 4.5) {
                  combos.push({
                    palette: palette.name,
                    backgroundShade: bg.level,
                    backgroundColor: bg.hex,
                    textShade: text.level,
                    textColor: text.hex,
                    contrastRatio: ratio,
                    wcagLevel: getWCAGLevel(ratio)
                  });
                }
              }
            }
          }
        });

        // Sort by palette, then by contrast ratio (descending)
        const paletteOrder = palettes.map(p => p.name);
        combos.sort((a, b) => {
          if (a.palette !== b.palette) {
            return paletteOrder.indexOf(a.palette) - paletteOrder.indexOf(b.palette);
          }
          return parseInt(a.backgroundShade) - parseInt(b.backgroundShade);
        });

        setColorCombos(combos);
      }); // end inner rAF
    }); // end outer rAF
    return () => cancelAnimationFrame(id);
  }, [theme]);

  const filteredCombos = React.useMemo(() => {
    if (wcagFilter === 'AA') {
      return colorCombos.filter(c => c.contrastRatio >= 4.5);
    }
    return colorCombos.filter(c => c.contrastRatio >= 7);
  }, [colorCombos, wcagFilter]);

  return (
    <>
      <Navbar
        title="Design Tokens"
        theme={theme}
        onThemeChange={setTheme}
      />

      <div style={{padding: '2rem', paddingTop: 'calc(80px + 2rem)', maxWidth: '1400px', margin: '0 auto'}}>

        {/* WCAG filter */}
        <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem'}}>
          <Text preset="label">Minimum contrast level:</Text>
          <div style={{
            display: 'flex',
            borderRadius: '6px',
            overflow: 'hidden',
            border: '1px solid var(--ods-color-neutral-300)'
          }}>
            {(['AA', 'AAA'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setWcagFilter(level)}
                style={{
                  padding: '0.375rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  background: wcagFilter === level ? 'var(--ods-theme-primary-color)' : 'transparent',
                  color: wcagFilter === level ? '#fff' : 'inherit',
                }}
              >
                {level}
                <span style={{fontWeight: 400, marginLeft: '0.35rem', fontSize: '0.75rem', opacity: 0.8}}>
                  ({level === 'AA' ? '≥4.5:1' : '≥7:1'})
                </span>
              </button>
            ))}
          </div>
          {filteredCombos.length > 0 && (
            <Text preset="caption" style={{opacity: 0.6}}>{filteredCombos.length} combinations</Text>
          )}
        </div>

        {paletteShades.length === 0 ? (
          <Spinner size="lg"/>
        ) : (
          paletteShades.map((palShades) => {
            const paletteCombos = filteredCombos.filter(c => c.palette === palShades.name);
            return (
              <div key={palShades.name} style={{marginBottom: '2rem'}}>
                {/* Palette heading */}
                <Text preset="heading-4" style={{margin: '0 0 0.25rem', textTransform: 'capitalize'}}>
                  {palShades.name}
                </Text>

                {/* Shades strip */}
                <div style={{display: 'flex', marginBottom: '0.75rem', borderRadius: '6px', overflow: 'hidden'}}>
                  {palShades.shades.map(({level, hex}) => {
                    const labelColor = getLuminance(hex) > 0.179 ? '#000000' : '#ffffff';
                    return (
                      <div
                        key={level}
                        title={`${palShades.name}-${level}: ${hex}`}
                        style={{
                          flex: 1,
                          minHeight: '52px',
                          backgroundColor: hex,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '2px',
                          color: labelColor,
                          fontSize: '0.6rem',
                          fontFamily: 'monospace',
                          padding: '4px 2px',
                        }}
                      >
                        <span style={{fontWeight: 700}}>{level}</span>
                        <span style={{opacity: 0.8}}>{hex}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Combination cards */}
                {paletteCombos.length === 0 ? (
                  <Text preset="caption" style={{opacity: 0.5}}>No combinations meet the selected contrast level.</Text>
                ) : (
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))'}}>
                    {paletteCombos.map((combo) => (
                      <Card
                        key={`${combo.backgroundShade}-${combo.textShade}`}
                        style={{
                          backgroundColor: combo.backgroundColor,
                          color: combo.textColor,
                          border: 'none',
                          borderRadius: '0',
                          padding: '0.75rem',
                          fontSize: '0.75rem',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: '0.5rem',
                        }}
                      >
                        <div>
                          <div>bg:&nbsp;
                            <Text preset="code" style={{color: 'inherit', fontSize: 'inherit'}}>
                              {combo.palette}-{combo.backgroundShade} <span>{combo.backgroundColor}</span>
                            </Text>
                          </div>
                          <div>text:&nbsp;
                            <Text preset="code" style={{color: 'inherit', fontSize: 'inherit'}}>
                              {combo.palette}-{combo.textShade} <span>{combo.textColor}</span>
                            </Text>
                          </div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', placeContent: 'flex-end', gap: '0.5rem'}}>
                          <span>{combo.contrastRatio.toFixed(2)}:1</span>
                          <Badge
                            color={combo.wcagLevel === 'AAA' ? 'success' : combo.wcagLevel === 'AA' ? 'information' : 'critical'}>
                            {combo.wcagLevel}
                          </Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </>
  );
};
