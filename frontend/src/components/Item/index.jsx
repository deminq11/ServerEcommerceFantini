import { Link } from "react-router-dom"
export default function Item ({item}) {
    return(
        <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
        <div style={{backgroundImage:`url(${item.thumbnails[0]})`}} className="overflow-hidden h-52 flex flex-col justify-center bg-cover items-center bg-black-600 rounded-t-xl">
        </div>
        <div className="p-4 md:p-6">
          <Link to={`/product/${item._id}`} className="transition block mb-1 text-xl font-semibol dark:text-neutral-300 dark:hover:text-violet-200">
            {item.title}
          </Link>
          <h3 className="text-l font-normal text-gray-800 dark:text-neutral-300">
            ${item.price}
          </h3>
          <Link to={`/product/${item._id}`} className="transition mt-3 text-gray-500 hover:text-gray-100 dark:text-neutral-500 dark:hover:text-neutral-300 line-clamp-1 text-ellipsis">
            {item.description}
          </Link>
        </div>
        <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
          <Link className="transition w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-b-lg bg-white text-gray-800 hover:text-violet-200 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" to={`/product/${item._id}`}>
            Ver detalles
          </Link>
        </div>
      </div>
    )
}
