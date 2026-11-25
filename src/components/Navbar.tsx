import {
  Icon,
  Input,
  Select,
  SelectContent,
  SelectControl,
  Text,
} from '@ovhcloud/ods-react';
import * as React from 'react';
import { useTheme } from '../hooks/useTheme';
import { ThemePicker } from './ThemePicker';

const CATEGORY_ITEMS = [
  { label: 'All Components', value: 'all', customRendererData: { icon: 'grid' } },
  { label: 'Form Elements', value: 'Form Elements', customRendererData: { icon: 'pen' } },
  { label: 'Navigation', value: 'Navigation', customRendererData: { icon: 'list' } },
  { label: 'Feedback', value: 'Feedback', customRendererData: { icon: 'bell' } },
  { label: 'Data Display', value: 'Data Display', customRendererData: { icon: 'columns' } },
  { label: 'Actions', value: 'Actions', customRendererData: { icon: 'lightning' } },
];

type IconSelectItem = {
  label: string;
  value: string;
  customRendererData?: { icon?: string };
};

/** An item's icon, when it has one, next to its label. */
const ItemLabel = ({ label, data, gap }: { label: string; data?: IconSelectItem['customRendererData']; gap: string }) => (
  <span style={{ display: 'flex', alignItems: 'center', gap }}>
    {data?.icon && <Icon name={data.icon as any} />}
    {label}
  </span>
);

/** A Select whose control and options show each item as an ItemLabel. */
const IconSelect = ({
  items,
  value,
  onValueChange,
  placeholder,
  ariaLabel,
}: {
  items: IconSelectItem[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
}) => (
  <Select
    items={items}
    value={value ? [value] : undefined}
    onValueChange={(details: any) => {
      const next = details.value[0];
      if (next) {
        onValueChange(next);
      }
    }}
  >
    <SelectControl
      aria-label={ariaLabel}
      placeholder={placeholder}
      customItemRenderer={({ selectedItems }) => (
        <ItemLabel
          label={selectedItems[0]?.label ?? ''}
          data={selectedItems[0]?.customRendererData}
          gap="0.375rem"
        />
      )}
    />
    <SelectContent
      className="navbar-select-content"
      customOptionRenderer={({ customData, label }) => <ItemLabel label={label} data={customData} gap="0.5rem" />}
    />
  </Select>
);

interface NavbarProps {
  title?: string;
  /** Search bar – omit to hide */
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  /** Category filter – omit to hide */
  selectedCategory?: string;
  onCategoryChange?: (value: string) => void;
}

export const Navbar = ({
  title,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: NavbarProps) => {
  // The theme lives here, not in the pages: a switch then re-renders the navbar alone, not every demo.
  const { theme, mode, resolvedMode, setTheme, setMode } = useTheme();

  // The navbar is fixed over the page and its height varies with the theme: publish it as --navbar-height,
  // for what must clear it (the sections' scroll margin, the component list's top).
  const navRef = React.useRef<HTMLElement>(null);
  React.useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) {
      return;
    }
    const root = document.documentElement;
    const update = () => root.style.setProperty('--navbar-height', `${nav.getBoundingClientRect().height}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-content">
        {/* Title */}
        {title && (
          <div className="navbar-title">
            <Text preset="heading-3">{title}</Text>
          </div>
        )}

        {/* Search */}
        {onSearchChange !== undefined && (
          <div className="navbar-search">
            <Input
              className="navbar-search-input"
              placeholder="Search components..."
              value={searchQuery ?? ''}
              onChange={(e: any) => onSearchChange(e.target.value)}
              clearable
            />
          </div>
        )}

        {/* Category filter */}
        {onCategoryChange !== undefined && (
          <div className="navbar-filter">
            <IconSelect
              items={CATEGORY_ITEMS}
              value={selectedCategory}
              onValueChange={onCategoryChange}
              placeholder="Category"
              ariaLabel="Category"
            />
          </div>
        )}

        {/* Theme and mode */}
        <ThemePicker
          mode={mode}
          onModeChange={setMode}
          onThemeChange={setTheme}
          resolvedMode={resolvedMode}
          theme={theme}
        />

      </div>
    </nav>
  );
};

