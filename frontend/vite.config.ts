import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import babel from "@rolldown/plugin-babel"

export default defineConfig({
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    host: process.env.HOST ? process.env.HOST : undefined,
  },
  plugins: [
    tailwindcss(),
    reactRouter(),
    babel({ plugins: ["relay"] }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
})
