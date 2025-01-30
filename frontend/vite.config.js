import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server: {
  //   proxy: {
  //     '/interviews': {
  //       target: 'http://127.0.0.1:8000/',  // The backend API
  //       changeOrigin: true,               // This will change the origin of the request to the target
  //       secure: false,                    // Set this to false if you're using HTTP instead of HTTPS
  //     },
  //   }
  // }
})
