import CustomRouter from "../../utils/CustomRouter.js"
import validateCartId from "../../middlewares/carts/validateCartId.mid.js";
import validateProductId from "../../middlewares/products/validateProductId.mid.js";
import validateAttributes from "../../middlewares/products/validateProductAttributes.mid.js";
import {readCartById, createCart, addToCart, updateCart, updateCartProdQuantity, emptyCart, deleteCartProduct, destroyCart} from "../../controllers/carts.controller.js"

class CartsApiRouter extends CustomRouter {
    constructor() {
        super()
        this.init()
    }
    init = () => {
        this.create("/", ["USER", "ADMIN"], createCart)
        this.read("/:cid", ["USER", "ADMIN"], validateCartId, readCartById)
        this.create("/:cid/products/:pid", ["USER", "ADMIN"], validateCartId, validateProductId, addToCart)
        this.update("/:cid", ["USER", "ADMIN"], validateCartId, validateAttributes, updateCart)
        this.update("/:cid/products/:pid", ["USER", "ADMIN"], validateCartId, validateProductId, updateCartProdQuantity)
        this.destroy("/:cid", ["USER", "ADMIN"], validateCartId, emptyCart)
        // this.destroy("/:cid", ["ADMIN"], validateCartId, destroyCart)
        this.destroy("/:cid/products/:pid", ["USER", "ADMIN"], validateCartId, validateProductId, deleteCartProduct)
    }
}
const cartsRouter = new CartsApiRouter()
export default cartsRouter.getRouter()