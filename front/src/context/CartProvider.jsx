import { cartContext } from "./cartContext";
import { useState } from "react";
import axios from "axios";

export default function CartProvider ({children}){
    const [cart, setCart] = useState([])
    const alreadyInCart = (item)=>{
        const index = cart.findIndex(cartItem => cartItem.id === item.id)
        if (index !== -1){
            return index
        }
        return -1
    }
    const addToCart = (item) => {   
        const index = alreadyInCart(item)
        if(index === -1){
            setCart([...cart, item])
        }else{
            const newCart = [...cart]
            newCart[index].quantity += item.quantity
            setCart(newCart)
        }
    }
    const deleteFromCart =(item) =>{
        const index = alreadyInCart(item)
        if(index !== -1){
            cart.splice(index, 1)
            setCart([...cart])
        }
    }
    const emptyCart = ()=>{
        cart.length = 0
        setCart([...cart])
    }
    return (
        <cartContext.Provider value={{cart, addToCart, deleteFromCart, emptyCart}}> 
            {children}
        </cartContext.Provider>
    )
}