import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import RubyPlugin from 'vite-plugin-ruby';

export default defineConfig({
  server: {
    host: true,
    port: 5173,
  },
  plugins: [
    RubyPlugin(),
    react(),
    eslintPlugin({
      cache: false,
      include: ['./src/**/*.js', './src/**/*.jsx'],
      exclude: [],
    }),
  ],
});
