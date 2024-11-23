import { Router } from "express";
import { create, read, readById, update, destroy  } from "../../data/mongo/managers/carts.manager.js";
import { readById as readProductById } from "../../data/mongo/managers/products.manager.js";
import validateCartId from "../../middlewares/validateCartId.mid.js";
import validateProductId from "../../middlewares/validateProductId.mid.js";
import validateAttributes from "../../middlewares/validateProductAttributes.mid.js";

export const cartsRouter = Router()
cartsRouter.post("/", createCart)
cartsRouter.get("/:cid", validateCartId, readCartById)
cartsRouter.post("/:cid/products/:pid", validateCartId, validateProductId, AddToCart)
cartsRouter.put("/:cid", validateCartId, validateAttributes, updateCart)
cartsRouter.put("/:cid/products/:pid", validateCartId, validateProductId, updateProductQuantity)
cartsRouter.delete("/:cid", validateCartId, destroyCart)
cartsRouter.delete("/:cid/products/:pid", validateCartId,validateProductId, deleteCartProduct)

async function createCart(req, res, next) {
    try {
        const message = "CART CREATED"
        const response = await create()
        return res.status(201).json({ message, response })
    } catch (error) {
        return next(error)
    }
}
async function readCartById(req, res, next) {
    try {
        const { cid } = req.params
        const message = "CART FOUND"
        const response = await readById(cid)
        return res.status(200).json({ message, response })
    } catch (error) {
        return next(error)
    }
}
async function AddToCart(req, res, next) {
    try {
        const { cid, pid } = req.params
        const message = "PRODUCT ADDED TO CART"

        const quantity = Number(req.query.quantity) || 1
        const productData = await readProductById(pid)
        const cart = await readById(cid)
        const index = cart.products.findIndex(productAttr=> productAttr.product._id.equals(productData._id))
        if(index !== -1){
            cart.products[index].quantity += quantity
        }else{
            cart.products.push({product:productData._id, quantity:quantity})
        }
        const response = await update(cid, cart)
        return res.status(200).json({ message, response })

    } catch (error) {
        return next(error)
    }
}
async function updateCart(req, res, next) {
    try {
        const { cid } = req.params
        const message = "CART UPDATED"

        const data = req.body
        const cart = await readById(cid)
        let quantity = data.quantity || 1
        cart.products.length = 0
        if(Array.isArray(data)){
            data.forEach( product=>{
                product.quantity = product.quantity || 1
                const duplicate = data.findIndex(p=> p._id === product._id && p !== product)
                if(duplicate !== -1){
                    quantity = (data[duplicate].quantity || 1) + product.quantity
                    data.splice(duplicate, 1)
                    cart.products.push({product:product, quantity})
                }else{
                    quantity = product.quantity
                    cart.products.push({product:product, quantity})
                }
            })
        }else{
            cart.products.push({product:data, quantity})
        }
        const response = await update(cid, cart)
        return res.status(200).json({ response, message })
    } catch (error) {
        return next(error)
    }
}
async function updateProductQuantity(req, res, next) {
    try {
        const { cid, pid } = req.params
        const message = "CART PRODUCT QUANTITY UPDATED"

        const quantity = req.body.quantity || req.query.quantity
        if(!quantity){
            const error = new Error(`No se introdujo quantity`)
            error.statusCode = 400
            throw error
        }
        if (isNaN(quantity) || Array.isArray(quantity)) {
            const error = new Error(`El atributo <<quantity>> no es de tipo Number.`)
            error.statusCode = 400
            throw error
        }

        const productData = await readProductById(pid)
        const cart = await readById(cid)
        const index = cart.products.findIndex(productAttr=> productAttr.product._id.equals(productData._id))
        if(index !== -1){
            cart.products[index].quantity = quantity
        }else{
            cart.products.push({product:productData._id, quantity:quantity})
        }
        const response = await update(cid, cart)
        return res.status(200).json({ response, message })
    } catch (error) {
        return next(error)
    }
}
async function destroyCart(req, res, next) {
    try {
        const { cid } = req.params
        const message = "CART PRODUCTS DELETED"

        const destroyQuery = req.query.destroy
        if (destroyQuery === "true"){
            const message = "CART DELETED"
            const response = await destroy(cid)
            return res.status(200).json({ message, response })
        }
        const cart = await readById(cid)
        cart.products.length = ""

        const response = await update(cid, cart)
        return res.status(200).json({ message, response })
    } catch (error) {
        return next(error)
    }
}
async function deleteCartProduct(req, res, next) {
    try {
        const { cid, pid } = req.params
        const message = "CART PRODUCT DELETED"

        const productData = await readProductById(pid)
        const cart = await readById(cid)
        const index = cart.products.findIndex(productAttr=> productAttr.product._id.equals(productData._id))
        if(index !== -1){
            cart.products.splice(index, 1)
        }else{
            const error = new Error(`No se encontró  el producto con id: <<${pid}>> en el carrito`)
            error.statusCode= 400
            throw error
        }
        const response = await update(cid, cart)
        return res.status(200).json({ message, response })
    } catch (error) {
        return next(error)
    }
}
