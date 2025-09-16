import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from './app-providers';
import './index.css'
import '../theme.css'
import App from './app'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AppProviders>
      <StrictMode>
        <App />
      </StrictMode>
    </AppProviders>
  </BrowserRouter>
)
