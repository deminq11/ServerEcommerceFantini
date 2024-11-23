import { read } from "../data/mongo/managers/products.manager.js"
export default async function validateCode(req,res,next){
    try {
        const codes = Array.isArray(req.body) ? req.body : [req.body.code];
        const {docs} = await read({}, 9999, 1, {}, "code")
        for (const code of codes) {
            const exists = docs.find(product => product.code === code);
            if(exists){
                const error = new Error(`Ya existe el producto con code: <<${exists.code}>>`)
                error.statusCode= 400
                throw error
            }
          }
        return next()
    } catch (error) {
        return next(error)
    }
}