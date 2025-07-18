import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Home } from '@/pages/Home.page';

// Mock Links component
vi.mock('@/components/Links.component', () => ({
  Links: () => <div data-testid="links-component">Links</div>
}));

// Mock ODS React Text component
vi.mock('@ovhcloud/ods-react', () => ({
  Text: ({
    children,
    className,
    preset
  }: {
    children: React.ReactNode;
    className?: string;
    preset?: string;
  }) => (
    <div className={className} data-testid={`text-${preset}`}>
      {children}
    </div>
  )
}));

describe('Home', () => {
  it('should render without crashing', () => {
    render(<Home />);
    expect(screen.getByTestId('text-heading-1')).toBeDefined();
  });
});
