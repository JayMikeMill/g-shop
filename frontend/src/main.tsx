import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import { ProductManagerProvider } from "./context/product-manager";
import { CartProvider } from './context/cart-context'
import { AuthProvider } from './context/auth-context';

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
