import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import RailsPlugin from 'vite-plugin-rails';

export default defineConfig({
  server: {
    host: true,
    port: 5173,
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['node_modules'],
        silenceDeprecations: ['import', 'mixed-decls', 'color-functions', 'global-builtin'],
      },
    },
  },
  plugins: [
    nodePolyfills({
      globals: {
        process: true,
        Buffer: true,
        global: true,
      },
      exclude: ['fs'],
      protocolImports: true,
    }),
    RailsPlugin(),
    react(),
    eslintPlugin({
      include: ['./app/frontend/**/*.{js,jsx}'],
      cache: false,
    }),
  ],
});
