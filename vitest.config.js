import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

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
    globals: true
  }
});
