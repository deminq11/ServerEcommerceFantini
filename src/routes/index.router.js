import { Router } from "express";
import { apiRouter } from "./apis/api.router.js";

export const indexRouter = Router()
indexRouter.use("/api", apiRouter)

