import { Router } from "express";
import {productsRouter} from "./productsRouter.api.js"
import {cartsRouter}from "./cartsRouter.api.js"

export const apiRouter = Router()
apiRouter.use("/products",productsRouter)
apiRouter.use("/carts",cartsRouter)