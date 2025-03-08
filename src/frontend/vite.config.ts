
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 2000,
    proxy: {
      '/api': {
        target: 'http://localhost:5432/', // Correct backend target
        changeOrigin:true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});






// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: 
//   [
//     react(),
//     tailwindcss(),
//   ],
//   server: {
//     port: 3000,
//     proxy:{
//       '/api': {
//         target: 'http://localhost:13000',
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//       }
            
//   }, 
// });
