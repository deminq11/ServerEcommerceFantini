import CustomRouter from "../../utils/CustomRouter.js"
import validateAttributes from "../../middlewares/products/validateProductAttributes.mid.js"
import validateProductId from "../../middlewares/products/validateProductId.mid.js";
import validateCode from "../../middlewares/products/validateProductCode.mid.js";
import {readProducts, readProductsById, createProduct, updateProduct, destroyProduct} from "../../controllers/products.controller.js"

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