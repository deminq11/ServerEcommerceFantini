import { useEffect, useState } from "react"
import readProducts from "./readProducts.js"

const useFetchItems = (id) => {
    const [items, setItems] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let isMounted = true
        const fetchItems = async () => {
            setIsLoading(true)
            try {
                const {message, response} = await readProducts(id);
                const fetchedItems = response.docs || response
                if (isMounted) {
                    setItems(fetchedItems);
                }
            } catch (error) {
                if (isMounted) {
                    console.error(`Fetch failed: ${error.message}`)
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }
        fetchItems()
        return () => {
            isMounted = false
        }
    }, [id])
    return { items, isLoading }
}
export default useFetchItems