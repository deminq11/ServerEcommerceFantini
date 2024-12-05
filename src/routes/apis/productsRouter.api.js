import CustomRouter from "../../utils/CustomRouter.js"
import { create, read, readById, update, destroy } from "../../data/mongo/managers/products.manager.js";
import validateAttributes from "../../middlewares/products/validateProductAttributes.mid.js"
import validateProductId from "../../middlewares/products/validateProductId.mid.js";
import validateCode from "../../middlewares/products/validateProductCode.mid.js";

class ProductsApiRouter extends CustomRouter {
    constructor() {
        super()
        this.init()
    }
    init = () => {
        this.read("/", ["PUBLIC"], readProducts)
        this.read("/:pid", ["PUBLIC"], validateProductId, readProductsById)
        this.create("/", ["ADMIN"], validateCode, validateAttributes, createProduct)
        this.update("/:pid", ["ADMIN"], validateProductId, validateCode, validateAttributes, updateProduct)
        this.destroy("/:pid", ["ADMIN"], validateProductId, destroyProduct)
    }
}

const productsRouter = new ProductsApiRouter()
export default productsRouter.getRouter()

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
    const { pagingCounter, totalDocs, ...data } = await read(queryCriteria, limit, page, sortCriteria)
    const response = { ...data }
    // delete data.limit 
    const message = "PRODUCTS FOUND"
    return res.json200(message, response)

}
async function readProductsById(req, res, next) {
    const { pid } = req.params
    const message = "PRODUCT FOUND"
    const response = await readById(pid)
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
    const response = await create(data)
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
    const response = await update(pid, data)
    return res.json200(message, response)
}
async function destroyProduct(req, res, next) {
    const { pid } = req.params
    const response = await destroy(pid)
    const message = "PRODUCT DELETED"
    return res.json200(message, response)
}