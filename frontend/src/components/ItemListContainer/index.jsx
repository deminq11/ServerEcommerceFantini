import ItemList from "../ItemList";
import { useParams } from "react-router-dom"
import useFetchItems from "../../utils/useFetchItems.js";


function ItemListContainer(){
    const {id} = useParams()
    const {items, isLoading} = useFetchItems(id);
    if (isLoading) {
        return <div className="fixed top-2/4 right-2/4">
            <div className="animate-spin inline-block size-16 border-[3px] border-current border-t-transparent text-violet-300 rounded-full" role="status" aria-label="loading">
            </div>
            <div>Loading...</div>
        </div>;
    }
    if (!items) {
        return (
        <>
        <div>ERROR:No Items available</div>
        <div>This page is no longer on service.</div>
        </>
    )
    }
    return(
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <h2 className="pb-5 text-center text-3xl lg:text-4xl text-gray-800 font-bold dark:text-neutral-200">
            Productos</h2>
            <ItemList items={items}/>
        </div>           
    )
}
export default ItemListContainer