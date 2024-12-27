export default function Carousel({images}){
    return (
        <div data-hs-carousel='{
                    "loadingClasses": "opacity-0"
                }' className="relative">
            <div className="hs-carousel relative overflow-hidden w-full min-h-96 rounded-lg">
                <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700">
                    <div className="hs-carousel-slide">
                        <div className="flex justify-center h-full">
                        <img src={images[0]} className="overflow-hidden h-full flex flex-col object-contain justify-center items-center rounded-t-xl"/>
                        </div>
                    </div>
                    {/* <div className="hs-carousel-slide">
                        <div className="flex justify-center h-full">
                        <img src={images[1]} className="overflow-hidden h-full flex flex-col object-contain justify-center items-center rounded-t-xl"/>
                        </div>                        
                    </div>
                    <div className="hs-carousel-slide">
                        <div className="flex justify-center h-full">
                        <img src={images[2]} className="overflow-hidden h-full flex flex-col object-contain justify-center items-center rounded-t-xl"/>
                        </div>                        
                    </div> */}
                </div>
            </div>
            <button type="button" className="hs-carousel-prev hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 focus:outline-none rounded-s-lg dark:text-white">
                <span className="text-2xl" aria-hidden="true">
                <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                </svg>
                </span>
                <span className="sr-only">Previous</span>
            </button>
            <button type="button" className="hs-carousel-next hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 focus:outline-none rounded-e-lg dark:text-white">
                <span className="sr-only">Next</span>
                <span className="text-2xl" aria-hidden="true">
                <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                </svg>
                </span>
            </button>
            <div className="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 space-x-2">
                <span className="hs-carousel-active:bg-gray-700 hs-carousel-active:border-gray-700 size-3 border border-gray-400 rounded-full cursor-pointer dark:border-neutral-600 dark:hs-carousel-active:bg-gray-500 dark:hs-carousel-active:border-gray-500"></span>
                <span className="hs-carousel-active:bg-gray-700 hs-carousel-active:border-gray-700 size-3 border border-gray-400 rounded-full cursor-pointer dark:border-neutral-600 dark:hs-carousel-active:bg-gray-500 dark:hs-carousel-active:border-gray-500"></span>
                <span className="hs-carousel-active:bg-gray-700 hs-carousel-active:border-gray-700 size-3 border border-gray-400 rounded-full cursor-pointer dark:border-neutral-600 dark:hs-carousel-active:bg-neutral-500 dark:hs-carousel-active:border-gray-500"></span>
            </div>
        </div>
)
}