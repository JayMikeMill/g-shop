import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app'
import { BrowserRouter } from 'react-router-dom';
import { ProductsProvider } from "@contexts/products-context";
import { CartProvider } from '@contexts/cart-context'
import { AuthProvider } from '@contexts/auth-context';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <ProductsProvider>
        <CartProvider>
          <StrictMode>
          <App />
          </StrictMode>,
        </CartProvider>
      </ProductsProvider>
    </BrowserRouter>
  </AuthProvider>
)
