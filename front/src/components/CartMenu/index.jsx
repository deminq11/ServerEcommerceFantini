import { useCartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";
import CartList from "../CartList";
export default function CartMenu(){
    const {cart} = useCartContext() 
    return(
        <>
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto border-b border-neutral-700">
                <h2 className="pb-5 text-3xl lg:text-4xl text-gray-800 font-bold dark:text-neutral-200">
                Mi Carrito</h2>
                {cart.length>0?
                <CartList cart={cart}/>
                : <div className="text-xl font-medium">Tu carrito esta vacío...
                <div className="font-normal">Agrega un <Link to="/" className="transition font-normal text-violet-300 hover:text-violet-400">producto</Link> para verlo.</div>
                </div>
                }
                    
            </div>
            <div className="max-w-[85rem] px-4 py-5 mx-auto flex items-center justify-end gap-6">
                <Link to="/"className="transition py-2 px-4 rounded-lg border border-neutral-600 font-medium text-base text-neutral-300 hover:text-neutral-200 hover:border-gray-600 hover:bg-neutral-900">Seguir Comprando</Link>
                <Link to="/checkout"className="transition py-2 px-4 rounded-lg border border-neutral-600 font-medium text-base text-neutral-300 hover:text-neutral-200  hover:border-violet-400 hover:bg-neutral-900" >Terminar Compra</Link>
            </div>
        </>
    )
}