import { Router } from "express";
import { create, read, readById, update, destroy } from "../../data/mongo/managers/carts.manager.js";
import validateCartId from "../../middlewares/carts/validateCartId.mid.js"
export const cartsView = Router()

cartsView.get("/:cid", validateCartId, readCartById)

async function readCartById(req, res, next) {
    try {
        const { cid } = req.params
        const cart = await readById(cid)
        const products = cart.products
        delete cart.products
        return res.status(200).render("cart",{cart, products})
    } catch (error) {
        return next(error)
    }
}