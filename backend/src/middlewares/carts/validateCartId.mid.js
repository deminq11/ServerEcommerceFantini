import { isValidObjectId } from "mongoose";
import { readById } from "../../dao/mongo/managers/carts.manager.js"
export default async function validateCartId(req, res, next) {
    try {
        const { cid } = req.params
        if(!cid) return next()
        if (!isValidObjectId(cid)) {
            const error = new Error(`Id de carrito inválido: <<${cid}>>`);
            error.statusCode = 400;
            throw error;
        }
        const cart = await readById(cid);
        if (!cart) {
            const error = new Error(`El carrito con id: <<${cid}>> no existe`);
            error.statusCode = 400;
            throw error;
        }
        return next();
    } catch (error) {
        return next(error);
    }
}
