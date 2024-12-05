import { Router } from "express"
import { verifyTokenUtil } from "./jsonToken.js"
import { readById } from "../data/mongo/managers/users.manager.js"

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
        res.json401 = () => res.status(401).json({ error: 401, message: "Bad Auth!" });
        res.json403 = () => res.status(403).json({ error: 403, message: "Forbidden!" });
        res.json404 = () => res.status(404).json({ error: 404, message: "Not found!" });
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
            const { role, user_id } = data
            if (!role || !user_id) {
                return res.json401()
            }
            if ((policies.includes("USER") && role === "USER") || (policies.includes("ADMIN") && role === "ADMIN")) {
                const user = await readById(user_id)
                if (!user) return res.json401()
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