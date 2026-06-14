import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/globals.css'
import { applyTheme } from '@/utils/applyTheme'
import { applyHead } from '@/utils/applyHead'
import App from './App.tsx'

// Apply brand + theme config before first render so the document <head> and
// CSS variables reflect the active brand from the very first paint.
applyTheme()
applyHead()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
