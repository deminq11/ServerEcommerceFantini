import { isValidObjectId } from "mongoose"
import { readById } from "../../data/mongo/managers/products.manager.js"
export default async function validateProductId(req,res,next){
    try {
        const { pid } = req.params
        if(!pid) return next()
        if (!isValidObjectId(pid)) {
            const error = new Error(`Id de producto inválido: <<${pid}>>`);
            error.statusCode = 400;
            throw error;
        }
        const product = await readById(pid)
        if(!product){
            const error = new Error(`El producto con id: <<${pid}>> no existe`)
            error.statusCode= 400
            throw error
        }
        return next()
    } catch (error) {
        return next(error)
    }
}
