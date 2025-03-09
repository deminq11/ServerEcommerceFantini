import { Router } from "express"
import { verifyTokenUtil } from "./jsonToken.js"
import { readById } from "../dao/mongo/managers/users.manager.js"

class CustomRouter {
    #router
    constructor() {
        this.#router = Router()
    }
    getRouter = () => this.#router
    #applyCallbacks = (callbacks) =>
        callbacks.map((cb) => async (req, res, next) => {
            try {
                await cb(req, res, next)
            } catch (error) {
                return next(error)
            }
        })
    responses = (req, res, next) => {
        res.json200 = (message, response) => res.status(200).json({ message, response });
        res.json201 = (message, response) => res.status(201).json({ message, response });
        res.json400 = (message) => res.status(400).json({ error: 400, message });
        res.json401 = (message) => res.status(401).json({ error: 401, message: "BAD AUTH" || message });
        res.json403 = (message) => res.status(403).json({ error: 403, message: "FORBIDDEN" || message });
        res.json404 = (message) => res.status(404).json({ error: 404, message: "NOT FOUND" || message });
        return next();
    }
    policies = (policies) => async (req, res, next) => {
        try {
            if (policies.includes("PUBLIC")) return next()
            const token = req?.cookies?.token
            if (!token) {
                return res.json401()
            }
            const data = verifyTokenUtil(token)
            const { user_id } = data
            if (!user_id) {
                return res.json401("UNVALID TOKEN")
            }
            const user = await readById(user_id)
            if ((policies.includes("USER") && user.role === "USER") || (policies.includes("ADMIN") && user.role === "ADMIN")) {
                if (!user) return res.json401("USER NOT FOUND")
                if (!user.verify) return res.json401("USER NOT VERIFIED")
                req.user = user
                return next()
            }
            return res.json403()
        } catch (error) {
            console.log(error)
            return res.json400(error.message)
        }
    }
    create = (path, policies, ...cbs) =>
        this.#router.post(
            path,
            this.responses,
            this.policies(policies),
            this.#applyCallbacks(cbs)
        )
    read = (path, policies, ...cbs) =>
        this.#router.get(
            path,
            this.responses,
            this.policies(policies),
            this.#applyCallbacks(cbs)
        )
    update = (path, policies, ...cbs) =>
        this.#router.put(
            path,
            this.responses,
            this.policies(policies),
            this.#applyCallbacks(cbs)
        )
    destroy = (path, policies, ...cbs) =>
        this.#router.delete(
            path,
            this.responses,
            this.policies(policies),
            this.#applyCallbacks(cbs)
        )
    use = (path, policies, ...cbs) =>
        this.#router.use(
            path,
            this.responses,
            this.policies(policies),
            this.#applyCallbacks(cbs)
        )
}

export default CustomRouter