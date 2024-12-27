import { Link } from "react-router-dom"
import { useCartContext } from "../../context/cartContext"
import CartWidgetItem from "../CartWidgetItem"
export default function CartWidgetMenu(){
    const {cart, emptyCart} = useCartContext()
    const handleEmpty = () => {
        emptyCart()
    }
    return(
        <div className="absolute top-6 right-6 min-w-72 p-1 grid grid-cols-1 rounded-2xl shadow-md bg-white border border-gray-200 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/50">
            {cart.length>0?cart.map(item => (
            <CartWidgetItem key={item._id} item={item}/>
            )):
            <div className="p-4 text-base font-medium">Tu carrito esta vacío...
            <div className="font-normal">Agrega un <Link to="/" className="transition font-medium text-violet-300 hover:text-violet-400">producto</Link> para verlo.</div>
            </div>
            
            }
            <div className="flex justify-evenly text-center border-t border-neutral-700">
                <button onClick={handleEmpty} className="transition text-sm border-r py-1 w-full h-full p-auto pb-2 pt-3 rounded-bl-2xl text-gray-800 hover:text-neutral-200 hover:bg-gray-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800">Vaciar Carrito</button>
                <Link className="transition text-sm border-l py-1 w-full px-auto pb-2 pt-3 rounded-br-2xl text-gray-800 hover:text-violet-300 hover:bg-gray-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800" to="/cart">Ir al Carrito</Link>
            </div>
        </div>
    )
}