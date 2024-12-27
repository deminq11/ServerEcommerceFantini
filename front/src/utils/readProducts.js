import axios from "axios"

export default async function readProducts(id){
    try{
        const url = id ? `http://localhost:3000/api/products/${id}` : "http://localhost:3000/api/products/"
        const {data} = await axios.get(url)
        return data
    }catch(error){
        throw error
    }
}