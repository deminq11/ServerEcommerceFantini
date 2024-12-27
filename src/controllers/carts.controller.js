import { readById as readProductById } from "../dao/mongo/managers/products.manager.js";
import { createService, destroyService, readService, updateService } from "../services/carts.service.js";

async function createCart(req, res, next) {
    const { user_id } = req.user
    const message = "CART CREATED"
    const response = await createService(user_id)
    return res.json201( message, response)
}
async function readCartById(req, res, next) {
    const { cid } = req.params
    const message = "CART FOUND"
    const response = await readService(cid)
    return res.json200( message, response)
}
async function addToCart(req, res, next) {
    const { cid, pid } = req.params
    const quantity = Number(req.query.quantity) || 1
    const productData = await readProductById(pid)
    const cart = await readService(cid)
    const index = cart.products.findIndex(productAttr => productAttr.product._id.equals(productData._id))
    if (index !== -1) {
        cart.products[index].quantity += quantity
    } else {
        cart.products.push({ product: productData._id, quantity: quantity })
    }
    const response = await updateService(cid, cart)
    const message = "PRODUCT ADDED TO CART"
    return res.json200( message, response)

}
async function updateCart(req, res, next) {
    const { cid } = req.params
    const data = req.body
    const cart = await readService(cid)
    let quantity = data.quantity || 1
    cart.products.length = 0
    if (Array.isArray(data)) {
        data.forEach(product => {
            product.quantity = product.quantity || 1
            const duplicate = data.findIndex(p => p._id === product._id && p !== product)
            if (duplicate !== -1) {
                quantity = (data[duplicate].quantity || 1) + product.quantity
                data.splice(duplicate, 1)
                cart.products.push({ product: product, quantity })
            } else {
                quantity = product.quantity
                cart.products.push({ product: product, quantity })
            }
        })
    } else {
        cart.products.push({ product: data, quantity })
    }
    const message = "CART UPDATED"
    const response = await updateService(cid, cart)
    return res.json200(message, response)
}
async function updateCartProdQuantity(req, res, next) {
    const { cid, pid } = req.params
    const quantity = req.body.quantity || req.query.quantity
    if (!quantity) {
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
    const cart = await readService(cid)
    const index = cart.products.findIndex(productAttr => productAttr.product._id.equals(productData._id))
    if (index !== -1) {
        cart.products[index].quantity = quantity
    } else {
        cart.products.push({ product: productData._id, quantity: quantity })
    }
    const message = "CART PRODUCT QUANTITY UPDATED"
    const response = await updateService(cid, cart)
    return res.json200( message, response)
}
async function emptyCart(req, res, next) {
    const { cid } = req.params
    const cart = await readService(cid)
    cart.products.length = ""
    const message = "CART PRODUCTS DELETED"
    const response = await updateService(cid, cart)
    return res.json200( message, response)
}
async function destroyCart(req, res, next) {
    const { cid } = req.params
    const message = "CART DELETED"
    const response = await destroyService(cid)
    return res.json200( message, response)
}
async function deleteCartProduct(req, res, next) {
    const { cid, pid } = req.params
    const productData = await readProductById(pid)
    const cart = await readService(cid)
    const index = cart.products.findIndex(productAttr => productAttr.product._id.equals(productData._id))
    if (index !== -1) {
        cart.products.splice(index, 1)
    } else {
        const error = new Error(`No se encontró  el producto con id: <<${pid}>> en el carrito`)
        error.statusCode = 400
        throw error
    }
    const message = "CART PRODUCT DELETED"
    const response = await update(cid, cart)
    return res.json200(message, response)
}

export {readCartById, createCart, addToCart, updateCart, updateCartProdQuantity, emptyCart, deleteCartProduct, destroyCart}