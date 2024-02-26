import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    proxy: {
      '/api': {
        target: process.env.BACKEND_URL || 'http://localhost:3000',
        rewrite: (path: string) => path.replace(/^\/api/, ''),
        changeOrigin: true,
        cookieDomainRewrite: {
          'api.tf2pickup.pl': 'tf2pickup.pl',
        },
      },
      '/socket.io/': {
        target: process.env.BACKEND_URL || 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
      },
    },
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});
