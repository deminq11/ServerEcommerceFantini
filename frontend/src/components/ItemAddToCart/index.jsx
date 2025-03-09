import { Link } from "react-router-dom"
import { useCartContext } from "../../context/cartContext";
export default function ItemAddToCart ({detail, quantity, onReset}){
    const {addToCart} = useCartContext()
    const handleAddToCart = ()=>{
        const detailToAdd = {...detail, quantity}
        addToCart(detailToAdd)
    }
    return(
        <div className="flex flex-col">
            <div className="text-center first-line:font-semibold text-base mb-2"><br />Vas a agregar {quantity} {detail.name} por ${Number.parseInt(quantity*detail.price)} al carrito.</div>
            <div className="flex items-center justify-center space-x-5">
                <Link onClick={handleAddToCart} to="/cart" className="transition border border-violet-300 text-center block font-md text-base w-fit rounded-lg py-3 px-6 text-gray-600 hover:text-gray-800 hover:bg-violet-200 focus:outline-none focus:text-gray-400  dark:text-neutral-200 dark:hover:text-violet-300 dark:hover:bg-neutral-900 dark:focus:text-neutral-400">Agregar</Link>
                <button  className="transition border border-neutral-900 text-center block font-light text-base w-fit rounded-lg py-2 px-2 text-gray-600 hover:text-neutral-300 hover:bg-red-200 focus:outline-none focus:text-gray-400  dark:text-neutral-400 dark:hover:bg-neutral-900 dark:focus:text-neutral-400 " onClick={onReset}>Cancelar</button>
            </div>
        </div>
    )
}