import {Badge, Card, Spinner, Text} from '@ovhcloud/ods-react';
import * as React from 'react';

// Utility function to calculate relative luminance
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

export const DesignTokens = () => {
  const [colorCombos, setColorCombos] = React.useState<ColorCombo[]>([]);

  React.useEffect(() => {
    // Get computed styles from the document
    const styles = getComputedStyle(document.body);

    // Define color palettes to test
    const palettes: ColorPalette[] = [
      {
        name: 'primary',
        shades: ['000', '050', '100', '200', '300', '400', '500', '600', '700', '800', '900']
      },
      {
        name: 'neutral',
        shades: ['000', '050', '100', '200', '300', '400', '500', '600', '700', '800', '900']
      },
      {
        name: 'information',
        shades: ['000', '050', '100', '200', '300', '400', '500', '600', '700', '800', '900']
      },
      {
        name: 'success',
        shades: ['000', '050', '100', '200', '300', '400', '500', '600', '700', '800', '900']
      },
      {
        name: 'warning',
        shades: ['000', '050', '100', '200', '300', '400', '500', '600', '700', '800', '900']
      },
      {
        name: 'critical',
        shades: ['000', '050', '100', '200', '300', '400', '500', '600', '700', '800', '900']
      },
    ];

    const combos: ColorCombo[] = [];

    // Find all valid AA or better combinations
    palettes.forEach((palette) => {
      const colors: ColorShade[] = [];

      // Get actual color values from CSS variables
      palette.shades.forEach((level) => {
        const varName = `--ods-color-${palette.name}-${level}`;
        const color = styles.getPropertyValue(varName).trim();

        if (color && color.startsWith('#')) {
          colors.push({level, hex: color});
        } else if (color && color.startsWith('rgb')) {
          // Convert rgb to hex
          const rgbMatch = color.match(/rgb\(([\d\.]+),\s*([\d\.]+),\s*([\d\.]+)\)/);
          if (rgbMatch) {
            const r = parseInt(rgbMatch[1]);
            const g = parseInt(rgbMatch[2]);
            const b = parseInt(rgbMatch[3]);
            const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
            colors.push({level, hex});
          }
        } else if(color === 'white' || color === 'black') {
          // Handle named colors
          const hex = color === 'white' ? '#FFFFFF' : '#000000';
          colors.push({level, hex});
        }
      });

      // Test all combinations within the palette
      for (let i = 0; i < colors.length; i++) {
        for (let j = 0; j < colors.length; j++) {
          if (i !== j) {
            const bg = colors[i];
            const text = colors[j];
            const ratio = getContrastRatio(bg.hex, text.hex);

            // Only include combinations that meet AAA standard (7:1 or better)
            if (ratio >= 7) {
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
  }, []);

  return (
    <div style={{padding: '2rem', maxWidth: '1400px', margin: '0 auto'}}>
      {colorCombos.length === 0 ? (
        <Spinner size="lg"/>
      ) : (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))'}}>
          {colorCombos.map((combo, index) => {
              const isNewPalette = index > 0 && colorCombos[index - 1].palette !== combo.palette;
              return (
                <React.Fragment key={`${combo.palette}-${combo.backgroundShade}-${combo.textShade}`}>
                  {isNewPalette && <div style={{gridColumn: '1 / -1', height: '1rem'}}/>}
                  <Card
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
                      gap: '0.5rem'
                    }}
                  >
                    <div>
                      <div>bg:&nbsp;
                        <Text preset={"code"} style={{color: 'inherit', fontSize: 'inherit'}}>
                          {combo.palette}-{combo.backgroundShade} <span>{combo.backgroundColor}</span>
                        </Text>
                      </div>
                      <div>text:&nbsp;
                        <Text preset={"code"} style={{color: 'inherit', fontSize: 'inherit'}}>
                          {combo.palette}-{combo.textShade} <span>{combo.textColor}</span>
                        </Text>
                      </div>
                    </div>
                    <div style={{display: 'flex', alignItems: "center", placeContent: 'flex-end', gap: '0.5rem'}}>
                      <span>{combo.contrastRatio.toFixed(2)}:1</span>
                      <Badge
                        color={combo.wcagLevel === 'AAA' ? 'success' : combo.wcagLevel === 'AA' ? 'information' : 'critical'}>
                        {combo.wcagLevel}
                      </Badge>
                    </div>
                  </Card>
                </React.Fragment>
              )
            }
          )}
        </div>
      )}
      <div style={{marginTop: '2rem', fontSize: '0.875rem', color: 'var(--ods-color-neutral-600)'}}>
        <p><strong>Note:</strong> WCAG 2.1 Standards:</p>
        <ul style={{marginTop: '0.5rem', paddingLeft: '1.5rem'}}>
          <li><strong>AAA (7:1+):</strong> Enhanced contrast for better accessibility</li>
          <li><strong>AA (4.5:1+):</strong> Minimum standard for normal text</li>
          <li><strong>AA Large (3:1+):</strong> Acceptable for large text (18pt+ or 14pt+ bold)</li>
        </ul>
      </div>
    </div>
  );
};
