import {useState } from "react"
import CartWidgetMenu from "../CartWidgetMenu"
import UserWidgetMenu from "../UserWidgetMenu"
export default function Widget({type}){
    const [active, setActive] = useState(false)
    const handleActive = ()=>{ 
        setActive(!active)
    }
    if(type === "user"){
        return(
            <>
                {active&& <div onClick={handleActive} className="z-20 fixed top-0 left-0 w-full h-full bg-neutral-900 opacity-25"></div>}
                <button onClick={handleActive} className="transition z-30 p-1 text-2xl rounded-full text-gray-300 hover:text-gray-500 dark:hover:text-white"  aria-label="User">
                    <i className="text-3xl fas fa-user"></i>
                </button>
                <div className="z-30 relative inline-block">
                    {active? <UserWidgetMenu handleActive={handleActive}/>: "" }
                </div>
            </>
        )
    }
    if(type === "cart"){
        return(
            <>
                {active&& <div onClick={handleActive} className="z-10 fixed top-0 left-0 w-full h-full bg-neutral-900 opacity-25"></div>}
                <button onClick={handleActive} className="transition z-20 p-1 text-2xl rounded-full text-gray-300 hover:text-gray-500 dark:hover:text-white"  aria-label="Cart"
                >
                    <i className="text-3xl fas fa-shopping-cart"></i>
                </button>
                <div className="z-20 relative inline-block">
                    {active? <CartWidgetMenu/> : ""}
                </div>
            </>
        )
    }
    
}
