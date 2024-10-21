import { Router } from "express";
import ProductManager from "../dao/ProductManager.js";
import CartManager from "../dao/CartManager.js";
import {errorProcessor} from "../utils/errorProcessor.js"

const productsPath="./src/data/productos.json"
const cartsPath="./src/data/carrito.json"

const productManager = new ProductManager(productsPath)
const cartManager = new CartManager(cartsPath)

export const router = Router()

router.post('/',async (req,res)=>{
    try {
        const newCart = await cartManager.createCart()
        return res.status(201).send(newCart)
    } catch (error) {
        errorProcessor(res, error, "server")
    }
})

router.get('/:cid',async (req,res)=>{
    try {
        let {cid} = req.params
        const cartById = await cartManager.getCartById(cid)
        if(!cartById){
            return res.status(404).send({error:`no se ha encontrado el carrito con id: ${cid}.`})
        }
        return res.status(200).send(cartById);
    } catch (error) {
        errorProcessor(res, error, "server")
    } 
})

router.post('/:cid/products/:pid',async (req,res)=>{
    try {
        let {cid, pid} = req.params
        const cartById = await cartManager.getCartById(cid)
        if(!cartById){
            return res.status(404).send({error:`no se ha encontrado el carrito con id: ${pid}.`})
        }
        const productById = await productManager.getProductById(pid)
        if(!productById){
            return res.status(404).send({error:`no se ha encontrado el producto con id: ${pid}.`})
        }
        const addedProduct = await cartManager.addToCart(productById, cartById)
        return res.status(200).send(addedProduct);
    } catch (error) {
        errorProcessor(res, error, "server")
    } 
})