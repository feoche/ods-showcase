import {
  Badge,
  BUTTON_EMPHASIS,
  BUTTON_GROUP_SIZE,
  BUTTON_SIZE,
  Button,
  ButtonGroup,
  ButtonGroupItem,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioControl,
  RadioGroup,
  RadioLabel,
  Text,
  Tile
} from '@ovhcloud/ods-react';
import type * as React from 'react';
import type { Mode, Theme } from '../hooks/useTheme';

type ResolvedMode = Exclude<Mode, 'auto'>;

/** The colours a preview draws a theme with. Fixed values: the --ods tokens only hold the active theme's. */
interface PreviewColors {
  page: string;
  card: string;
  border: string;
  heading: string;
  text: string;
  brand: string;
  onBrand: string;
}

interface ThemeOption {
  value: Theme;
  label: string;
  description: string;
  preview: Record<ResolvedMode, PreviewColors>;
}

// Colours read from each theme's build: surface-page, surface-raised, border-container, content-heading,
// content-text, surface-brand and content-on-brand-solid. Black Friday dark shows its white offer tiles.
const THEME_OPTIONS: ThemeOption[] = [
  {
    description:
      'Neutral and unbranded, graphite on white. The showcase default.',
    label: 'White label',
    preview: {
      dark: {
        border: '#475569',
        brand: '#f2f2f2',
        card: '#131c2b',
        heading: '#ffffff',
        onBrand: '#1a1a1a',
        page: '#0b1220',
        text: '#e8edf3'
      },
      light: {
        border: '#cfd7e2',
        brand: '#333333',
        card: '#ffffff',
        heading: '#131c2b',
        onBrand: '#ffffff',
        page: '#ffffff',
        text: '#475569'
      }
    },
    value: 'white-label'
  },
  {
    description: "OVHcloud's navy theme.",
    label: 'Aluminium',
    preview: {
      dark: {
        border: '#283d61',
        brand: '#0050d7',
        card: '#101e35',
        heading: '#ffffff',
        onBrand: '#ffffff',
        page: '#091222',
        text: '#edf0f5'
      },
      light: {
        border: '#cccccc',
        brand: '#0050d7',
        card: '#ffffff',
        heading: '#101e35',
        onBrand: '#ffffff',
        page: '#f2f2f2',
        text: '#374f76'
      }
    },
    value: 'aluminium'
  },
  {
    description: "OVHcloud's historic blue theme.",
    label: 'Blue Jeans',
    preview: {
      dark: {
        border: '#283d61',
        brand: '#0050d7',
        card: '#101e35',
        heading: '#ffffff',
        onBrand: '#ffffff',
        page: '#091222',
        text: '#edf0f5'
      },
      light: {
        border: '#cccccc',
        brand: '#0050d7',
        card: '#ffffff',
        heading: '#00185e',
        onBrand: '#ffffff',
        page: '#ffffff',
        text: '#4d5592'
      }
    },
    value: 'blue-jeans'
  },
  {
    description: 'Green phosphor on a near-black console.',
    label: 'Terminal',
    preview: {
      dark: {
        border: '#12301c',
        brand: '#00ff41',
        card: '#06100a',
        heading: '#c8ffd4',
        onBrand: '#001a07',
        page: '#020604',
        text: '#c8ffd4'
      },
      light: {
        border: '#c5e0cc',
        brand: '#00802b',
        card: '#ffffff',
        heading: '#020604',
        onBrand: '#ffffff',
        page: '#f4faf5',
        text: '#0a2e17'
      }
    },
    value: 'terminal'
  },
  {
    description: 'Neon cyan on night navy, Orbitron headings.',
    label: 'Hackathon',
    preview: {
      dark: {
        border: '#1b789e',
        brand: '#2f5bea',
        card: '#15214f',
        heading: '#22e3ff',
        onBrand: '#ffffff',
        page: '#0b1748',
        text: '#e8ecff'
      },
      light: {
        border: '#7aefff',
        brand: '#2f5bea',
        card: '#ffffff',
        heading: '#0a0e2c',
        onBrand: '#ffffff',
        page: '#f5f7ff',
        text: '#0a0e2c'
      }
    },
    value: 'hackathon'
  },
  {
    description: 'Cyan on midnight navy, teal-edged cards.',
    label: 'Summit',
    preview: {
      dark: {
        border: '#2ec1e0',
        brand: '#46d3ff',
        card: '#0b1024',
        heading: '#46d3ff',
        onBrand: '#050816',
        page: '#050816',
        text: '#e8eef8'
      },
      light: {
        border: '#c8f2ff',
        brand: '#0036c9',
        card: '#ffffff',
        heading: '#050816',
        onBrand: '#ffffff',
        page: '#f4f7fc',
        text: '#0b1024'
      }
    },
    value: 'summit'
  },
  {
    description: 'White offer tiles on a royal-blue page.',
    label: 'Black Friday',
    preview: {
      dark: {
        border: '#ffffff',
        brand: '#0050d7',
        card: '#ffffff',
        heading: '#ffffff',
        onBrand: '#ffffff',
        page: '#031265',
        text: '#e8ebff'
      },
      light: {
        border: '#e6e6e6',
        brand: '#0050d7',
        card: '#ffffff',
        heading: '#000000',
        onBrand: '#ffffff',
        page: '#f2f2f2',
        text: '#4d5592'
      }
    },
    value: 'black-friday'
  }
];

const MODE_OPTIONS: {
  value: Mode;
  label: string;
  icon: 'monitor' | 'sun' | 'moon';
}[] = [
  { icon: 'monitor', label: 'Auto', value: 'auto' },
  { icon: 'sun', label: 'Light', value: 'light' },
  { icon: 'moon', label: 'Dark', value: 'dark' }
];

const previewStyle = (colors: PreviewColors) =>
  ({
    '--theme-preview-border': colors.border,
    '--theme-preview-brand': colors.brand,
    '--theme-preview-card': colors.card,
    '--theme-preview-heading': colors.heading,
    '--theme-preview-on-brand': colors.onBrand,
    '--theme-preview-page': colors.page,
    '--theme-preview-text': colors.text
  }) as React.CSSProperties;

/** A miniature page of the theme in one mode: a heading, text, a card and a primary button. */
const ThemeMiniature = ({ colors }: { colors: PreviewColors }) => (
  <span
    aria-hidden="true"
    className="theme-miniature theme-miniature--preview"
    style={previewStyle(colors)}
  >
    <span className="theme-miniature__heading" />
    <span className="theme-miniature__text" />
    <span className="theme-miniature__card">
      <span className="theme-miniature__text theme-miniature__text--short" />
    </span>
    <span className="theme-miniature__button" />
  </span>
);

interface ThemePickerProps {
  theme: Theme;
  mode: Mode;
  resolvedMode: ResolvedMode;
  onThemeChange: (theme: string) => void;
  onModeChange: (mode: string) => void;
}

export const ThemePicker = ({
  theme,
  mode,
  resolvedMode,
  onThemeChange,
  onModeChange
}: ThemePickerProps) => {
  const current =
    THEME_OPTIONS.find((option) => option.value === theme) ?? THEME_OPTIONS[0];
  const currentMode =
    MODE_OPTIONS.find((option) => option.value === mode) ?? MODE_OPTIONS[0];

  return (
    <Popover overlayConfig={{ position: 'bottom-end' }}>
      <PopoverTrigger asChild>
        <Button
          aria-label={`Appearance: ${current.label} theme, ${currentMode.label} mode`}
          className="theme-picker-trigger"
          emphasis={BUTTON_EMPHASIS.medium}
          size={BUTTON_SIZE.sm}
        >
          <Icon name="theme" />
          <span className="theme-picker-trigger__theme">{current.label}</span>
          <span className="theme-picker-trigger__mode">
            <Icon name={currentMode.icon} />
            {currentMode.label}
          </span>
          <Icon name="chevron-down" />
        </Button>
      </PopoverTrigger>

      <PopoverContent aria-label="Appearance" className="theme-picker">
        <div className="theme-picker__top">
          <section className="theme-picker__section">
            <div className="theme-picker__heading">
              <Text id="theme-picker-mode" preset="label">
                Mode
              </Text>
            </div>
            <ButtonGroup
              aria-labelledby="theme-picker-mode"
              onValueChange={(detail) =>
                detail.value[0] && onModeChange(detail.value[0])
              }
              size={BUTTON_GROUP_SIZE.sm}
              value={[mode]}
            >
              {MODE_OPTIONS.map((option) => (
                <ButtonGroupItem key={option.value} value={option.value}>
                  <Icon name={option.icon} /> {option.label}
                </ButtonGroupItem>
              ))}
            </ButtonGroup>
          </section>
          <Badge className="theme-picker__version" size="sm" status="neutral">
            ODS v{__ODS_VERSION__}
          </Badge>
        </div>

        <section className="theme-picker__section">
          <div className="theme-picker__heading">
            <Text id="theme-picker-theme" preset="label">
              Theme
            </Text>
          </div>
          <RadioGroup
            aria-labelledby="theme-picker-theme"
            className="theme-picker__grid"
            onValueChange={(detail) =>
              detail.value && onThemeChange(detail.value)
            }
            value={theme}
          >
            {THEME_OPTIONS.map((option) => (
              <Tile
                className="theme-picker__tile"
                key={option.value}
                selected={option.value === theme}
              >
                <Radio className="theme-picker__option" value={option.value}>
                  <span className="theme-picker__option-header">
                    <RadioControl />
                    <RadioLabel className="theme-picker__option-label">
                      {option.label}
                    </RadioLabel>
                  </span>
                  <Text
                    className="theme-picker__option-description"
                    preset="small"
                  >
                    {option.description}
                  </Text>
                  <ThemeMiniature colors={option.preview[resolvedMode]} />
                </Radio>
              </Tile>
            ))}
          </RadioGroup>
        </section>
      </PopoverContent>
    </Popover>
  );
};
