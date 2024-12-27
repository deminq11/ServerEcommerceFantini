import { useState } from "react"

export default function ItemCount ({stock, onAdd}){
    const [count, setCount] = useState(1)
    const handleAdd = () =>{      
        if(count<stock){
            setCount(count+1)}
    }
    const handleSubstract = () =>{
        if(count>1){
            setCount(count-1)}
    }
    return(
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center space-x-2">
            <button onClick={handleSubstract} className="transition w-fit p-1 text-2xl rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-white focus:outline-none" >-</button>
            <p className="text-center min-w-7 text-base rounded-full border-y-2 text-gray-200 border-violet-300">{count}</p>
            <button onClick={handleAdd} className="transition w-fit p-1 text-2xl rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-white focus:outline-none"
            >+</button>
            </div>
            <button onClick={()=> onAdd(count)} disabled={!stock} className="transition mt-2 border border-neutral-400 text-center font-light text-base w-fit rounded-lg py-3 px-3 text-gray-600 hover:text-neutral-800 hover:bg-violet-200 focus:outline-none focus:text-gray-400  dark:text-neutral-300 dark:hover:border-violet-300 dark:hover:text-neutral-300 dark:hover:bg-neutral-900 dark:focus:text-neutral-400">Agregar al carrito</button>
        </div>
    )
}