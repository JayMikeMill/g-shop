import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import { ProductManagerProvider } from "@contexts/product-manager";
import { CartProvider } from '@contexts/cart-context'
import { AuthProvider } from '@contexts/auth-context';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <ProductManagerProvider>
        <CartProvider>
          <StrictMode>
          <App />
          </StrictMode>,
        </CartProvider>
      </ProductManagerProvider>
    </BrowserRouter>
  </AuthProvider>
)
