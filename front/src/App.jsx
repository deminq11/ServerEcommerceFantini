import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar"
import ItemListContainer from "./components/ItemListContainer"
import ItemDetailContainer from "./components/ItemDetailContainer"
import CartMenu from "./components/CartMenu"
import LoginForm from "./components/LoginForm";
import PasswordResetForm from "./components/PasswordResetForm";
// import CheckoutMenu from "./components/CheckoutMenu"

function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<ItemListContainer/>}/>
        {/* <Route path="/category/:id" element={<ItemListContainer/>}/> */}
        <Route path="/product/:id" element={<ItemDetailContainer/>}/>
        <Route path="/cart" element={<CartMenu/>}/>
        <Route path="/login" element={<LoginForm />}/>
        <Route path="/register" element={<LoginForm/>}/>
        <Route path="/reset-password/:resetToken" element={<PasswordResetForm/>}/>
        {/* <Route path="/checkout" element={<CheckoutMenu/>}/> */}
      </Routes>
    </>
  )
}

export default App
