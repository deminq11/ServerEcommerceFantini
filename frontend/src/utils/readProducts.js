import axios from "axios"
export default async function readProducts(id){
    try{
        const url = id ? `${import.meta.env.VITE_API_URL}/api/products/${id}` : `${import.meta.env.VITE_API_URL}/api/products/`
        const {data} = await axios.get(url)
        return data
    }catch(error){
        throw error
    }
}