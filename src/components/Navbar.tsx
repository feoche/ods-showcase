import {
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
import { NavLink } from 'react-router';

const PAGE_LINKS: Array<{ to: string; label: string; end?: boolean }> = [
  { to: '/', label: 'ODS Showcase', end: true },
  { to: '/design-tokens', label: 'WCAG Design Tokens' }
];

const CATEGORY_ITEMS = [
  { label: 'All Components', value: 'all', customRendererData: { icon: 'grid' } },
  { label: 'Form Elements', value: 'Form Elements', customRendererData: { icon: 'pen' } },
  { label: 'Navigation', value: 'Navigation', customRendererData: { icon: 'list' } },
  { label: 'Feedback', value: 'Feedback', customRendererData: { icon: 'bell' } },
  { label: 'Data Display', value: 'Data Display', customRendererData: { icon: 'columns' } },
  { label: 'Actions', value: 'Actions', customRendererData: { icon: 'lightning' } },
];

const THEME_ITEMS = [
  { label: 'None', value: 'theme-none', customRendererData: { icon: 'xmark' } },
  { label: 'Light', value: 'theme-light', customRendererData: { icon: 'sun' } },
  { label: 'Dark', value: 'theme-dark', customRendererData: { icon: 'moon' } },
];

interface NavbarProps {
  title?: string;
  theme: string;
  onThemeChange: (theme: string) => void;
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
  theme,
  onThemeChange,
  drawerTitle,
  drawerContent,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: NavbarProps) => {
  const [isTocOpen, setIsTocOpen] = React.useState(false);
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

        {/* Page links */}
        <nav className="navbar-page-links">
          {PAGE_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `navbar-page-link${isActive ? ' active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Search */}
        {onSearchChange !== undefined && (
          <div className="navbar-search">
            <Input
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
            <Select
              items={CATEGORY_ITEMS}
              value={selectedCategory ? [selectedCategory] : undefined}
              onValueChange={(details: any) => onCategoryChange(details.value[0] ?? 'all')}
            >
              <SelectControl
                placeholder="Category"
                customItemRenderer={({ selectedItems }) => {
                  const icon = selectedItems[0]?.customRendererData?.icon;
                  const label = selectedItems[0]?.label ?? '';
                  return (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      {icon && <Icon name={icon as any} />}
                      {label}
                    </span>
                  );
                }}
              />
              <SelectContent
                customOptionRenderer={({ customData, label }) => (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Icon name={customData?.icon as any} />
                    {label}
                  </span>
                )}
              />
            </Select>
          </div>
        )}

        {/* Theme select */}
        <div className="navbar-theme-select">
          <Select
            items={THEME_ITEMS}
            value={[theme]}
            onValueChange={(details: any) => onThemeChange(details.value[0])}
          >
            <SelectControl
              customItemRenderer={({ selectedItems }) => {
                const icon = selectedItems[0]?.customRendererData?.icon ?? 'sun';
                const label = selectedItems[0]?.label ?? '';
                return (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <Icon name={icon as any} />
                    {label}
                  </span>
                );
              }}
            />
            <SelectContent
              customOptionRenderer={({ customData, label }) => (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Icon name={customData?.icon as any} />
                  {label}
                </span>
              )}
            />
          </Select>
        </div>
      </div>
    </nav>
  );
};

