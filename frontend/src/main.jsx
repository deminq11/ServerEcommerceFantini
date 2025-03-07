import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import CartProvider from "./context/CartProvider.jsx"
import App from './App.jsx'
import './index.css'
import UserProvider from './context/UserProvider.jsx';

console.log("hola")
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>
  </BrowserRouter>,
)
