import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@pages': '/src/pages',
      '@components': '/src/components',
      '@interfaces': '/src/interfaces',
      '@utils': '/src/utils',
      '@context': '/src/context',
    },
  },
});
