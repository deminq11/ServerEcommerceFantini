import { Link } from "react-router-dom"
import { useState } from "react"
import { useCartContext } from "../../context/cartContext"
export default function CartItem ({item}) {
    const {deleteFromCart} = useCartContext()
    const [quantity, setCount] = useState(item.quantity)
    const handleAdd = () =>{      
        if(quantity<item.stock){setCount(quantity+1)}
    }
    const handleSubstract = () =>{
        if(quantity>1){setCount(quantity-1)}
    }
    const handleDelete = () => {deleteFromCart(item)}
   
    const price = ("$"+Number.parseInt(quantity*item.price))
    return(
      <div className="group flex flex-row h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
        <div style={{ backgroundImage: `url(${item.thumbnails[0]})` }} className="w-1/4  h-30 overflow-hidden bg-cover rounded-l-xl">
        </div>
        <div className="flex-row p-4 md:p-10">
            <Link to={`/product/${item._id}`} className="w-fit transition block mb-1 text-xl dark:text-neutral-300 dark:hover:text-violet-200">
              {item.title}
            </Link>
            <Link to={`/product/${item._id}`} className="transition text-gray-500 hover:text-gray-100 dark:text-neutral-500 dark:hover:text-neutral-300 line-clamp-1 text-ellipsis">
              {item.description}
            </Link>
        </div>
        <div className="flex flex-col items-center justify-center md:p-4 border-x border-neutral-700">
              <h3 className="text-xl font-normal rounded-md border-b-2 border-violet-300 text-gray-800 dark:text-neutral-300">
                {price}
              </h3>
            <div className="flex items-center space-x-2">
              <button onClick={handleAdd} className="w-fit p-1 text-xl rounded-full text-neutral-400 hover:text-gray-500 dark:hover:text-white focus:outline-none">
                +
              </button>
              <h3 className="text-center min-w-6 my-1 text-base rounded-full border-y-2 text-gray-200 border-violet-300">
                {quantity}
              </h3>
              <button onClick={handleSubstract} className="w-fit p-1 text-xl rounded-full text-neutral-400 hover:text-gray-500 dark:hover:text-white focus:outline-none">
                -
              </button>
            </div>
          </div>
        <div className="flex flex-col justify-center md:p-6"> 
          <button onClick={handleDelete} className="transition text-xl text-gray-500 hover:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-300 focus:outline-none ml-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      </div>
    )
}