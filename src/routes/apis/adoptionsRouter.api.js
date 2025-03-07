import {createAdoption, getAllAdoptions, getAdoption} from "../../controllers/adoption.controller.js"
import CustomRouter from "../../utils/CustomRouter.js"

class AdoptionsApiRouter extends CustomRouter {
    constructor() {
        super()
        this.init()
    }
    init = () => {
        this.create("/", ["USER", "ADMIN"], createAdoption)
        this.read("/", ["ADMIN"], getAllAdoptions)
        this.read("/:aid", ["USER", "ADMIN"], getAdoption)
    }
}

const adoptionsRouter = new AdoptionsApiRouter()
export default adoptionsRouter.getRouter()