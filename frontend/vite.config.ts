import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-styled-components'],
      },
    }),
    tsconfigPaths(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@assets': './src/assets',
      '@configuration': './src/configuration',
      '@components': './src/components',
      '@context': './src/context',
      '@pages': './src/pages/*',
      '@hooks': './src/hooks',
      '@utilities': './src/utilities',
    },
  },
});
