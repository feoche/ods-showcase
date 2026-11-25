import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    mainFields: ['module']
  },
  test: {
    coverage: {
      exclude: [
        'src/types',
        'src/vite-*.ts',
        'src/i18n.ts',
        'src/main.tsx',
        'src/routes.tsx'
      ],
      include: ['src']
    },
    environment: 'jsdom',
    // tests/visual holds the Playwright specs: `pnpm test:visual` runs them.
    exclude: [...configDefaults.exclude, 'tests/visual/**'],
    globals: true
  }
});
