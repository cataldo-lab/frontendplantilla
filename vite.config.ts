import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Solución alternativa sin usar import.meta
const PROJECT_ROOT = path.resolve();

export default defineConfig({
  plugins: [react()],
  preview: {port:443, host:true},
  resolve: {
    alias: {
      '@components': path.resolve(PROJECT_ROOT, './src/components'),
      '@hooks': path.resolve(PROJECT_ROOT, './src/hooks'),
      '@context': path.resolve(PROJECT_ROOT, './src/context'),
      '@pages': path.resolve(PROJECT_ROOT, './src/pages'),
      '@services': path.resolve(PROJECT_ROOT, './src/services'),
      '@styles': path.resolve(PROJECT_ROOT, './src/styles'),
      '@assets': path.resolve(PROJECT_ROOT, './src/assets'),
      '@helpers': path.resolve(PROJECT_ROOT, './src/helpers')
    }
  },
});