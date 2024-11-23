import { Router } from "express";
import { apiRouter } from "./apis/api.router.js";
import { viewsRouter } from "./views/views.router.js";

export const indexRouter = Router()
indexRouter.use("/api", apiRouter)
indexRouter.use("/", viewsRouter) 

