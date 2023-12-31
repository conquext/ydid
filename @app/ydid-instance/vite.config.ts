import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
// export default defineConfig({

//   server: {
//     port: 5700,
//   },
//   build: {
//     emptyOutDir: false,
//     // lib: {
//     //   entry: path.resolve(__dirname, 'src/main.ts'),
//     //   formats: ['es'],
//     //   name: 'UiLib',
//     // },
//     rollupOptions: {
//       external: ['react'],
//       output: {
//         globals: {
//           React: 'react',
//         },
//       },
//     },
//   },
//   plugins: [react(), dts()],
// });

export default defineConfig(({ mode }) => {
  const envFile =
    mode === 'development' ? '.env.development' : '.env.production';
  dotenv.config({ path: envFile });
  return {
    plugins: [react(), dts()],
    build: {
      outDir: 'build',
      // entry: path.resolve(__dirname, 'src/main.tsx'),
      assetsDir: 'assets',
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5700,
      proxy: {
        '/api': {
          target: process.env.API_BASE_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
