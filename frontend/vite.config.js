import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const fileEnv = loadEnv(mode, process.cwd(), '')
  const apiUrl = String(process.env.VITE_API_URL || fileEnv.VITE_API_URL || '').trim()
  const isVercelBuild = Boolean(process.env.VERCEL || process.env.VERCEL_ENV)
  const pointsToLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/i.test(apiUrl)
  const usesHttps = /^https:\/\//i.test(apiUrl)

  if (isVercelBuild && (!apiUrl || pointsToLocalhost || !usesHttps)) {
    throw new Error(
      'Vercel cần VITE_API_URL trỏ tới backend Render, ví dụ: https://your-service.onrender.com/api',
    )
  }

  return {
    plugins: [react(), tailwindcss()],
  }
})
