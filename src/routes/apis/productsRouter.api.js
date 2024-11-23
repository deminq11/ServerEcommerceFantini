import { Router } from "express";
import { create, read, readById, update, destroy } from "../../data/mongo/managers/products.manager.js";
import validateAttributes from "../../middlewares/validateProductAttributes.mid.js"
import validateProductId from "../../middlewares/validateProductId.mid.js";
import validateCode from "../../middlewares/validateProductCode.mid.js";
export const productsRouter = Router()

productsRouter.get("/", readProducts)
productsRouter.get("/:pid", validateProductId, readProductsById)
productsRouter.post("/", validateCode, validateAttributes, createProduct)
productsRouter.put("/:pid", validateProductId, validateCode, validateAttributes, updateProduct)
productsRouter.delete("/:pid", validateProductId, destroyProduct)

async function readProducts(req, res, next) {
    try {
        let {limit, page, sort, query} = req.query
        let sortCriteria = {};
        let queryCriteria = query? JSON.parse(query) : {}
        if (sort) {
            if (sort === "1" || sort === "-1") {
                sortCriteria = { price: parseInt(sort, 10) };
            } else {
                sortCriteria = JSON.parse(sort);
            }
        }
        const { docs, pagingCounter, totalDocs, ...data} = await read(queryCriteria, limit, page, sortCriteria)
        const response = {status:"success", payload:docs, ...data}
        delete data.limit
        return res.status(200).json(response)
    } catch (error) {
        return next(error)
    }
}
async function readProductsById(req, res, next) {
    try {
        const { pid } = req.params
        const response = await readById(pid)
        return res.status(200).json({ status:"success", response })
    } catch (error) {
        return next(error)
    }
}
async function createProduct(req, res, next) {
    try {
        if(req.body._id){
            const error = new Error(`no se puede indicar id.`)
            error.statusCode = 400
            throw error
        }
        const data = req.body
        const response = await create(data)
        return res.status(201).json({ status:"success", response })
    } catch (error) {
        return next(error)
    }
}
async function updateProduct(req, res, next) {
    try {
        const { pid } = req.params
        if(req.body._id){
            const error = new Error(`no se puede indicar id.`)
            error.statusCode = 400
            throw error
        }
        const data = req.body
        const response = await update(pid, data)
        return res.status(200).json({ status:"success", response })
    } catch (error) {
        return next(error)
    }
}
async function destroyProduct(req, res, next) {
    try {
        const { pid } = req.params
        const response = await destroy(pid)
        return res.status(200).json({ status:"success", response })
    } catch (error) {
        return next(error)
    }
}