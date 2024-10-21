import { Router } from "express";
import ProductManager from "../dao/ProductManager.js";
import {errorProcessor} from "../utils/errorProcessor.js"
import { validateAttributes } from "../utils/validateAttributes.js";
export const router = Router()

const path="./src/data/productos.json"
const productManager = new ProductManager(path)

router.get('/',async (req,res)=>{
    try {
        let {limit} = req.query
        let products = await productManager.getProducts()
        if(limit){
            limit=Number(limit)
            if(isNaN(limit)|| limit<= 0 || !Number.isInteger(limit)){
                return res.status(400).send({error:`el limit debe ser un número entero y mayor que cero: ?limit=${req.query.limit}<--(${limit})`})
            }
        }else{
            limit=products.length
        }
        products = products.slice(0, limit)
        return res.status(200).send(products)

    } catch (error) {
        errorProcessor(res, error, "server")
    }
})

router.get('/:pid',async (req,res)=>{
    try {
        let {pid} = req.params
        const productById = await productManager.getProductById(pid)
        if(!productById){
            return res.status(404).send({error:`no se ha encontrado el producto con id: ${pid}.`})
        }
        return res.status(200).send(productById);
    } catch (error) {
        errorProcessor(res, error, "server")
    } 
    
})

router.post('/',async (req,res)=>{
    try {
        let {id, code, ...newProduct} = req.body
        if(Object.entries(req.body).length === 0){
            return res.status(400).send({error:`body esta vacío.`})
        }
        if(id){
            return res.status(400).send({error:`no se puede indicar el id de un producto.`})
        }

        let products = await productManager.getProducts()
        let exists = products.find(product=>product.code===code)
        if(exists){
            return res.status(400).send({error:`ya existe el producto con code: ${exists.code}`})
        }

        let attributesValidated = validateAttributes(res, {code, ...newProduct})
        if(attributesValidated){
            let addedProduct = await productManager.addProduct({code, ...newProduct})
            return res.status(201).send(addedProduct)
        }
    } catch (error) {
        errorProcessor(res, error, "server")
    }
})

router.put('/:pid',async (req,res)=>{
    try {
        let {id, ...productChanges} = req.body
        let {pid} = req.params
        if(Object.entries(req.body).length === 0){
            return res.status(400).send({error:`body esta vacío.`})
        }
        if(id){
            return res.status(400).send({error:`no se puede modificar el id de un producto.`})
        }
        const originalProduct = await productManager.getProductById(pid)
        if(!originalProduct){
            return res.status(404).send({error:`no se ha encontrado al producto con id: ${pid}.`})
        }
        let attributesValidated = validateAttributes(res, {...productChanges})
        if(attributesValidated){
            let updatedProduct = await productManager.modifyProduct(originalProduct, {...productChanges})
            return res.status(200).send(updatedProduct);
        }
    } catch (error) {
        errorProcessor(res, error, "server")
    }
})

router.delete('/:pid',async (req,res)=>{
    try {
        let {pid} = req.params
        const productById = await productManager.getProductById(pid)
        if(!productById){
            return res.status(404).send({error:`no se ha encontrado el producto con id: ${pid}.`})
        }
        let deletedProduct = await productManager.deleteProduct(productById)
        return res.status(200).send(deletedProduct);

    } catch (error) {
        errorProcessor(res, error, "server")
    }
})