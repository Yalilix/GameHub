import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  base: '/GameHub/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setup.js',
  },
  server: {
    port: 3000,
  },
  optimizeDeps: {
    include: ['react-syntax-highlighter'],
  },
});
