import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { DesignTokens } from './pages/DesignTokens.page';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <DesignTokens />
    </StrictMode>
  );
}
