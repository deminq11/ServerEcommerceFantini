import { useParams } from "react-router-dom"
import { useState} from "react";
import { Link } from "react-router-dom";
import Carousel from "../Carousel";
import ItemAddToCart from "../ItemAddToCart"
import ItemCount from "../ItemCount";
import useFetchDetail from "../../utils/useFetchItems";

export default function ItemDetailContainer(){
    const [addedQuantity, setAddedQuantity] = useState (0)
    const handleOnAdd = quantity =>{ setAddedQuantity(quantity) }
    const resetAddedQuantity = () =>{ setAddedQuantity(0) }
    const {id} = useParams()
    const {items:detail, isLoading} = useFetchDetail(id);
    
    if (isLoading) {
        return <div className="fixed top-1/3 right-2/4">
        <div className="animate-spin inline-block size-16 border-[3px] border-current border-t-transparent text-violet-300 rounded-full" role="status" aria-label="loading">
        </div>
        <div>Loading...</div>
    </div>;
    }
    if (!detail) {
        <div>ERROR: Product Not Found</div>
    }
    return(
        <>
            <div className="max-w-[85rem] px-4 py-5 sm:px-6 lg:px-8 lg:py-9 mx-auto">
            <Link to="/"><i className="pb-4 text-2xl fas fa-long-arrow-left text-neutral-400 hover:text-violet-300"></i></Link>
            <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32 border-y-2 py-6 border-neutral-700">
                <Carousel images={detail.thumbnails}/>
                <div className="mt-5 sm:mt-10 lg:mt-0">
                    <div className="space-y-6 sm:space-y-8">
                        <div className="space-y-2 md:space-y-4">
                        <h2 className="font-bold text-3xl lg:text-4xl text-gray-800 dark:text-neutral-200">
                            {detail.title}
                        </h2>
                        <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
                            ${detail.price}
                        </p>
                        </div>
                        <div className="space-y-2 md:space-y-4">
                        <p className="text-lg text-gray-700 dark:text-gray-200">
                            {detail.description}
                        </p>
                        </div>
                        <div>
                            {
                                addedQuantity > 0 ? (
                                    <ItemAddToCart detail={detail} quantity={addedQuantity}  onReset={resetAddedQuantity}/>
                                ) : (
                                    <ItemCount stock={detail.stock} onAdd={(quantity)=> handleOnAdd(quantity)}/>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}