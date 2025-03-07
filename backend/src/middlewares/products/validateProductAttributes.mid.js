import { isValidObjectId } from "mongoose"

export default function validateAttributes(req, res, next){
    function validateObject(obj){
        let {_id, title, description, code, price, status, stock, category, thumbnails, quantity, ...restOfAttributes} = obj
        let stringAttributes = {title, code, description, category}
        let numberAttributes = {price, stock}

        if(Object.entries(req.body).length === 0){
            const error = new Error(`body esta vacío.`)
            error.statusCode = 400
            throw error
        }
        if(Object.keys(restOfAttributes).length > 0){
            const error = new Error(`Ha introducido atributos no permitidos: ${Object.keys(restOfAttributes)}`)
            error.statusCode = 400
            throw error
        }
        if(_id){
            if (typeof _id !== 'string') {
                const error = new Error(`El atributo _id debe ser una cadena de texto. <<_id:${_id}     = ${typeof _id}>>`);
                error.statusCode = 400;
                throw error;
            }
            if(!isValidObjectId(_id)){
                const error = new Error(`El atributo <<_id :${_id}>> es inválido.`);
                error.statusCode = 400;
                throw error;
            }
        }
        if(quantity){
            if (isNaN(quantity) || Array.isArray(quantity)) {
                const error = new Error(`El atributo <<quantity>> no es de tipo Number.`)
                error.statusCode = 400
                throw error
            }
        }
        
        for (const [key, value] of Object.entries(stringAttributes)) {
            if(typeof value !== "undefined"){ 
                if (typeof value !== "string") {
                    const error = new Error(`El atributo <<(${key}: ${value})>> no es de tipo String.`)
                    error.statusCode = 400
                    throw error
                }
            }
        }
        for (const [key, value] of Object.entries(numberAttributes)) {
            if(typeof value !== "undefined"){ 
                if (typeof value !== "number") {
                    const error = new Error(`El atributo <<(${key}: ${value})>> no es de tipo Number.`)
                    error.statusCode = 400
                    throw error
                }
            }
        }
        if(status!==undefined){
            if(typeof status !== "boolean"){
                const error = new Error(`El atributo <<(status: ${status})>> no es de tipo Boolean.`)
                error.statusCode = 400
                throw error
            }
        }
        if(thumbnails!==undefined){
            if (!Array.isArray(thumbnails) || thumbnails.some(thumbnail => typeof thumbnail !== "string")) {
                const error = new Error("Asegúrese que el atributo thumbnails sea un array de strings.")
                error.statusCode = 400
                throw error
            }
        }
    }
    if (Object.entries(req.body).length === 0) {
        const error = new Error('body esta vacío.')
        error.statusCode = 400;
        throw error
    }
    if (Array.isArray(req.body)) {
        req.body.forEach((item, index) => {
            try {
                validateObject(item)
            } catch (error) {
                error.message = `Error en el objeto #${index + 1}: ${error.message}`
                throw error
            }
        })
    } else {
        validateObject(req.body)
    }
    return next()
}
