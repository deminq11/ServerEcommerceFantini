import CustomRouter from "../../utils/CustomRouter.js"
import { getAllPets, createPet } from "../../controllers/pets.controller.js"
import { readMockUsers, createMockUsers } from "../../controllers/usersMock.controller.js"
class MocksApiRouter extends CustomRouter {
    constructor() {
        super()
        this.init()
    }
    init = () => {
        this.read("/mockingpets", ["ADMIN"], getAllPets)
        this.create("/mockingpets", ["ADMIN"], createPet)
        this.read("/mockingusers", ["ADMIN"], readMockUsers)
        this.create("/generateData", ["ADMIN"], createMockUsers)
    }
}
const mocksRouter = new MocksApiRouter()
export default mocksRouter.getRouter()