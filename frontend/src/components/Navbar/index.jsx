import Widget from "../Widget"
import { Link } from 'react-router-dom'; 

function NavBar(){
  const linkStyles = ["block font-light text-base rounded-lg py-1 px-1 hover:bg-gray-100 text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-400 dark:focus:text-neutral-400"]
  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-2 dark:bg-neutral-800">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
      <Link
        className="flex-none font-semibold dark:text-white focus:outline-none"
        to="/"
        aria-label="Brand"
      >
        <span className="inline-flex items-center gap-x-2 text-3xl font-semibold dark:text-white hover:text-gray-800 hover:dark:text-violet-200">
          <img
            className="w-20 h-auto"
            src="https://ssl.gstatic.com/docs/common/profile/platypus_lg.png"
            alt="Logo"
          />
          Platypus.
        </span> 
      </Link>

        <div className="flex flex-row items-center text-xl gap-5 mt-5 pb-2 overflow-x-auto sm:justify-end sm:mt-0 sm:ps-5 sm:pb-0 sm:overflow-x-visible [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          <div className="hs-dropdown relative inline-flex">
            <button type="button" className="text-2xl hs-dropdown-toggle inline-flex justify-center items-center gap-x-2 dark:text-neutral-200 dark:hover:text-neutral-300" aria-expanded="false" aria-label="Menu">
              Categorías
              <svg className="hs-dropdown-open:rotate-180 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 w-56 hidden z-10 mt-2 min-w-60 bg-white shadow-md rounded-lg p-2 dark:bg-neutral-800 dark:border-neutral-700 dark:divide-neutral-700" role="menu" aria-orientation="vertical"aria-labelledby="hs-dropdown-unstyled">
                <Link to="/" className="block py-2 px-1 text-lg font-medium  text-gray-600 hover:text-gray-400 dark:text-neutral-300 dark:hover:text-neutral-100">
                  Ornitorrincos
                </Link>
                <div className="border-t py-2 first:pt-0 last:pb-0"/>
                <span className="block px-1 text-xs font-medium uppercase text-gray-400 dark:text-neutral-500">
                 Pelaje
                </span>
                <Link className={linkStyles} to="/category/marron">Marrón</Link>
                <Link className={linkStyles} to="/category/gris">Gris</Link>
              <div className="border-t py-4 first:pt-0 last:pb-0">
                <span className="block px-1 text-xs font-medium uppercase text-gray-400 dark:text-neutral-500">
                 Tamaño
                </span>
                <Link className={linkStyles} to="/category/chico">Chico</Link>
                <Link className={linkStyles} to="/category/mediano">Mediano</Link>
                <Link className={linkStyles} to="/category/grande">Grande</Link>
              </div>
            </div>
          </div>
          <Widget type="cart"/>
          <Widget type="user"/>
        </div>
      </nav>
    </header>
  )
}
export default NavBar