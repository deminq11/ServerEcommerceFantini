import { Router } from "express";
import  productsRouter  from "./productsRouter.api.js"
import  cartsRouter  from "./cartsRouter.api.js"
import  usersRouter  from "./usersRouter.api.js"
import  sessionsRouter  from "./sessionsRouter.api.js"
import  mocksRouter  from "./mocksRouter.api.js"

export const apiRouter = Router()
apiRouter.use("/products", productsRouter)
apiRouter.use("/carts", cartsRouter)
apiRouter.use("/users", usersRouter)
apiRouter.use("/auth", sessionsRouter)
apiRouter.use("/mocks", mocksRouter)