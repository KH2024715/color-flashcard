import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // 標準版を使用

export default defineConfig({
  plugins: [react()],
  base: '/color-flashcard',
})