import react from '@vitejs/plugin-react-swc';
import { readFileSync } from 'node:fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const odsVersion: string = JSON.parse(
  readFileSync(resolve(__dirname, 'node_modules/@ovhcloud/ods-react/package.json'), 'utf-8')
).version;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: './',
  define: {
    __ODS_VERSION__: JSON.stringify(odsVersion)
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    },
    outDir: 'dist'
  }
});
