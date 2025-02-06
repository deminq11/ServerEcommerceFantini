import { createService, destroyService, readService, readByIdService, updateService } from "../services/products.service.js";

async function readProducts(req, res, next) {
    let { limit, page, sort, query } = req.query
    let sortCriteria = {};
    let queryCriteria = query ? JSON.parse(query) : {}
    if (sort) {
        if (sort === "1" || sort === "-1") {
            sortCriteria = { price: parseInt(sort, 10) };
        } else {
            sortCriteria = JSON.parse(sort);
        }
    }
    const { pagingCounter, totalDocs, ...data } = await readService(queryCriteria, limit, page, sortCriteria)
    delete data.limit 
    const response = { ...data }
    const message = "PRODUCTS FOUND"
    return res.json200(message, response)

}
async function readProductsById(req, res, next) {
    const { pid } = req.params
    const message = "PRODUCT FOUND"
    const response = await readByIdService(pid)
    return res.json200(message, response)

}
async function createProduct(req, res, next) {
    if (req.body._id) {
        const error = new Error(`no se puede indicar id.`)
        error.statusCode = 400
        throw error
    }
    const data = req.body
    const message = "PRODUCT CREATED"
    const response = await createService(data)
    return res.json201(message, response)
}
async function updateProduct(req, res, next) {
    const { pid } = req.params
    if (req.body._id) {
        const error = new Error(`no se puede indicar id.`)
        error.statusCode = 400
        throw error
    }
    const data = req.body
    const message = "PRODUCT UPDATED"
    const response = await updateService(pid, data)
    return res.json200(message, response)
}
async function destroyProduct(req, res, next) {
    const { pid } = req.params
    const response = await destroyService(pid)
    const message = "PRODUCT DELETED"
    return res.json200(message, response)
}
export {destroyProduct , updateProduct, readProducts, readProductsById, createProduct}