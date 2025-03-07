import { useState } from "react"
import { useCartContext } from "../../context/cartContext"
import { Link } from "react-router-dom"
export default function CartWidgetItem ({item}) {
    const {deleteFromCart} = useCartContext()
    const [quantity, setCount] = useState(item.quantity)
    const handleAdd = () =>{      
        if(quantity<item.stock){setCount(quantity+1)}
    }
    const handleSubstract = () =>{
        if(quantity>1){setCount(quantity-1)}
    }
    const handleDelete = () => {deleteFromCart(item)}
    return(
      <div className="group flex flex-row h-full bg-white border-t first:border-t-0 border-gray-200 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"> 
        <Link to={`/product/${item._id}`}className="flex-row p-4">
            <span className="block mb-1 w-40 text-base font-normal dark:text-neutral-200 dark:hover:text-violet-200">
              {item.title}
            </span>     
        </Link>
        <div className="flex flex-col items-center justify-center border-neutral-700">
            <div className="flex items-center">
              <button onClick={handleAdd} className=" pr-2 text-xl rounded-full text-neutral-400 hover:text-gray-500 dark:hover:text-white focus:outline-none">
                +
              </button>
              <h3 className="text-center min-w-5 text-sm rounded-full border-y-2 text-gray-200 border-violet-300">
                {quantity}
              </h3>
              <button onClick={handleSubstract} className="pl-2 text-base font-bold rounded-full text-neutral-400 hover:text-gray-500 dark:hover:text-white focus:outline-none">
                -
              </button>
            </div>
          </div>
        <div className="flex flex-col justify-center"> 
          <button onClick={handleDelete} className="transition text-xl text-gray-500 hover:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-300 focus:outline-none ml-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      </div>
    )
}