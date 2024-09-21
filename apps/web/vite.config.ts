import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { dependencies } from './package.json';
import { visualizer } from 'rollup-plugin-visualizer';

const vendor = ['react', 'react-router-dom', 'react-dom'];

function defineChunks(deps: Record<string, string>) {
  const chunks = {};
  Object.keys(deps).forEach((key) => {
    if ([...vendor, 'vite-tsconfig-paths'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), visualizer() as PluginOption],
  server: {
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      external: ['vite-tsconfig-paths'],
      output: {
        manualChunks: {
          vendor,
          ...defineChunks(dependencies),
        },
      },
    },
  },
});
