import CustomRouter from "../../utils/CustomRouter.js"
import {createUser, readUsers, updateUser, destroyUser} from "../../controllers/users.controller.js"

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