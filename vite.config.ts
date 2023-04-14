import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import Rails from 'vite-plugin-rails'

export default defineConfig({
  plugins: [
    react(),
    Rails({ fullReload: { additionalPaths: ['config/routes.rb', 'app/views/**/*'] } }),
  ],
  resolve: {
    alias: {
      components: resolve(__dirname, 'app/frontend/components'),
      pages: resolve(__dirname, 'app/frontend/pages'),
      layouts: resolve(__dirname, 'app/frontend/layouts'),
      images: resolve(__dirname, 'app/frontend/images'),
      types: resolve(__dirname, 'app/frontend/types'),
    },
  },
})
