import { Router } from "express"
import ProductManager from "../dao/ProductManager.js"
import {errorProcessor} from "../utils/errorProcessor.js"
export const router = Router()

const path = "./src/data/productos.json"
const productManager = new ProductManager(path)
router.get('/',async (req,res)=>{
    try {
        let products = await productManager.getProducts()
        return res.status(200).render("realTimeProducts", { products })
    } catch (error) {
        errorProcessor(res, error, "server")
    }
})

