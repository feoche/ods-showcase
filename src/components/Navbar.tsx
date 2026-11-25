import {
  Badge,
  DRAWER_POSITION,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerTrigger,
  Icon,
  Input,
  Select,
  SelectContent,
  SelectControl,
  Text,
} from '@ovhcloud/ods-react';
import * as React from 'react';
import { useTheme } from '../hooks/useTheme';

const CATEGORY_ITEMS = [
  { label: 'All Components', value: 'all', customRendererData: { icon: 'grid' } },
  { label: 'Form Elements', value: 'Form Elements', customRendererData: { icon: 'pen' } },
  { label: 'Navigation', value: 'Navigation', customRendererData: { icon: 'list' } },
  { label: 'Feedback', value: 'Feedback', customRendererData: { icon: 'bell' } },
  { label: 'Data Display', value: 'Data Display', customRendererData: { icon: 'columns' } },
  { label: 'Actions', value: 'Actions', customRendererData: { icon: 'lightning' } },
];

// White label first: it is the default theme.
const THEME_ITEMS = [
  { label: 'White label', value: 'white-label' },
  { label: 'Aluminium', value: 'aluminium' },
  { label: 'Blue Jeans', value: 'blue-jeans' },
  { label: 'Terminal', value: 'terminal' },
  { label: 'Hackathon', value: 'hackathon' },
];

const MODE_ITEMS = [
  { label: 'Auto', value: 'auto', customRendererData: { icon: 'monitor' } },
  { label: 'Light', value: 'light', customRendererData: { icon: 'sun' } },
  { label: 'Dark', value: 'dark', customRendererData: { icon: 'moon' } },
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
  contentClassName,
}: {
  items: IconSelectItem[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  /** Extra classes for the dropdown, which is portalled out of the navbar. */
  contentClassName?: string;
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
      className={contentClassName ? `navbar-select-content ${contentClassName}` : 'navbar-select-content'}
      customOptionRenderer={({ customData, label }) => <ItemLabel label={label} data={customData} gap="0.5rem" />}
    />
  </Select>
);

interface NavbarProps {
  title?: string;
  /** Drawer TOC content – omit to hide the hamburger */
  drawerTitle?: string;
  drawerContent?: (closeDrawer: () => void) => React.ReactNode;
  /** Search bar – omit to hide */
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  /** Category filter – omit to hide */
  selectedCategory?: string;
  onCategoryChange?: (value: string) => void;
}

export const Navbar = ({
  title,
  drawerTitle,
  drawerContent,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: NavbarProps) => {
  const [isTocOpen, setIsTocOpen] = React.useState(false);
  // The theme lives here, not in the pages: a switch then re-renders the navbar alone, not every demo.
  const { theme, mode, setTheme: onThemeChange, setMode: onModeChange } = useTheme();
  const hasDrawer = drawerContent !== undefined;
  const closeDrawer = () => setIsTocOpen(false);


  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Hamburger / Drawer */}
        {hasDrawer && (
          <Drawer open={isTocOpen} onOpenChange={(details) => setIsTocOpen(details.open)}>
            <DrawerTrigger asChild>
              <button className="navbar-hamburger" aria-label="Open menu">
                <Icon name="hamburger-menu" />
              </button>
            </DrawerTrigger>
            <DrawerContent className="toc-container" position={DRAWER_POSITION.left}>
              <DrawerBody>
                {drawerTitle && <Text preset="label" className="toc-title">{drawerTitle}</Text>}
                <div className="toc-list">{drawerContent(closeDrawer)}</div>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        )}

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

        {/* Theme and mode selects, joined into one control */}
        <div className="navbar-appearance" role="group" aria-label="Theme and mode">
          <div className={`navbar-theme-select navbar-theme-select--${theme}`}>
            <IconSelect
              items={THEME_ITEMS}
              value={theme}
              onValueChange={onThemeChange}
              ariaLabel="Theme"
              contentClassName="navbar-theme-content"
            />
          </div>
          <div className="navbar-mode-select">
            <IconSelect
              items={MODE_ITEMS}
              value={mode}
              onValueChange={onModeChange}
              ariaLabel="Mode"
              contentClassName={`navbar-mode-content navbar-mode-content--${theme}`}
            />
          </div>
        </div>

        {/* ODS version */}
        <Badge className="navbar-version" status="neutral" size="sm">
          ODS v{__ODS_VERSION__}
        </Badge>
      </div>
    </nav>
  );
};

