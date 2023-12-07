import react from '@vitejs/plugin-react';
// import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5700,
  },
  build: {
    emptyOutDir: false,
    // lib: {
    //   entry: path.resolve(__dirname, 'src/main.ts'),
    //   formats: ['es'],
    //   name: 'UiLib',
    // },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          React: 'react',
        },
      },
    },
  },
  plugins: [react(), dts()],
});
