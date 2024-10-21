import { errorProcessor } from "./errorProcessor.js"
export const validateAttributes=(res, attributes)=>{
    let validateError = ""
    let {title, description, code, price, status, stock, category, thumbnails, ...restOfAttributes} = attributes
    let stringAttributes = {title, description, code, category}
    let numberAttributes = {price, stock}

    if(Object.keys(restOfAttributes).length > 0){
        validateError = `Ha introducido atributos no permitidos: ${Object.keys(restOfAttributes)}`
        errorProcessor(res,validateError, "validation")
        return false
        
    }
    for (const [key, value] of Object.entries(stringAttributes)) {
        if (typeof value !== "string") {
            validateError = `El atributo <<(${key}: ${value})>> no es de tipo String.`;
            errorProcessor(res, validateError, "validation");
            return false
        }
    }
    for (const [key, value] of Object.entries(numberAttributes)) {
        if (typeof value !== "number") {
            validateError = `El atributo <<(${key}: ${value})>> no es de tipo Number.`;
            errorProcessor(res, validateError, "validation");
            return false
        }
    }
    if(typeof status !== "boolean"){
        validateError = `El atributo <<(status: ${status})>> no es de tipo Boolean.`
        errorProcessor(res,validateError, "validation")
        return false
    }
    if(thumbnails!==undefined){
        if (!Array.isArray(thumbnails) || thumbnails.some(thumbnail => typeof thumbnail !== "string")) {
            validateError = "Asegúrese que el atributo thumbnails sea un array de strings."
            errorProcessor(res,validateError, "validation")
            return false
        }
    }
    if(validateError===""){
        return true
    }
}
