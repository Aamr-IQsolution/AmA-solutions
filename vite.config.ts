import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), tailwindcss()],
      define: {
        // Public client values only — never inject server secrets.
        'process.env.GA_MEASUREMENT_ID': JSON.stringify(env.GA_MEASUREMENT_ID),
        'process.env.TURNSTILE_SITE_KEY': JSON.stringify(env.TURNSTILE_SITE_KEY),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
