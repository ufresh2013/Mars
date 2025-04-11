import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/style/variable.css'
import './index.css'
import '@xyflow/react/dist/style.css'
import 'virtual:svg-icons-register'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
