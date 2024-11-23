import { Router } from "express";
import { productsView } from "./productsView.router.js";
import { cartsView } from "./cartsView.router.js";

export const viewsRouter = Router()
viewsRouter.use("/products", productsView)
viewsRouter.use("/carts", cartsView)
