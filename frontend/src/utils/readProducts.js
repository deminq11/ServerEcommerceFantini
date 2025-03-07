import axios from "axios"
export default async function readProducts(id){
    console.log(import.meta.env.VITE_API_URL)
    try{
        const url = id ? `${import.meta.env.VITE_API_URL}/products/${id}` : `${import.meta.env.VITE_API_URL}/products/`
        const {data} = await axios.get(url)
        return data
    }catch(error){
        throw error
    }
}