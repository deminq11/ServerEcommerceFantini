import { Router } from "express";
import productsRouter from "./productsRouter.api.js"
import cartsRouter from "./cartsRouter.api.js"
import usersRouter from "./usersRouter.api.js"
import petsRouter from "./petsRouter.api.js"
import adoptionsRouter from "./adoptionsRouter.api.js"
import sessionsRouter from "./sessionsRouter.api.js"
import mocksRouter from "./mocksRouter.api.js"
import { spec } from "../../docs/swagger-options.js";
import swaggerUiExpress from "swagger-ui-express"

export const apiRouter = Router()

apiRouter.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec, {
    swaggerOptions: {
        withCredentials: true,
        persistAuthorization: true,
    }
})
)
apiRouter.get("/docs-json", (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.send(spec)
})
apiRouter.use("/products", productsRouter)
apiRouter.use("/carts", cartsRouter)
apiRouter.use("/users", usersRouter)
apiRouter.use("/pets", petsRouter)
apiRouter.use("/adoptions", adoptionsRouter)
apiRouter.use("/auth", sessionsRouter)
apiRouter.use("/mocks", mocksRouter)