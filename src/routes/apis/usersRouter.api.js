import CustomRouter from "../../utils/CustomRouter.js"
import { create, read, update, destroy, } from "../../data/mongo/managers/users.manager.js"

class UsersApiRouter extends CustomRouter {
    constructor() {
        super()
        this.init()
    }
    init = () => {
        this.create("/", ["ADMIN"], createUser)
        this.read("/", ["ADMIN"], readUsers)
        this.update("/:uid", ["USER", "ADMIN"], updateUser)
        this.destroy("/:uid", ["USER", "ADMIN"], destroyUser)
    }
}

const usersRouter = new UsersApiRouter()
export default usersRouter.getRouter()

async function createUser(req, res) {
    const message = "USER CREATED"
    const data = req.body
    const response = await create(data)
    return res.json201(message, response)
}
async function readUsers(req, res) {
    const message = "USERS FOUND"
    const response = await read()
    return res.json200(message, response)
}
async function updateUser(req, res) {
    const { uid } = req.params
    const data = req.body
    const message = "USER UPDATED"
    const response = await update(uid, data)
    return res.json200(message, response)
}
async function destroyUser(req, res) {
    const { uid } = req.params
    const message = "USER DELETED"
    const response = await destroy(uid)
    return res.json200(message, response)
}