import CustomRouter from "../../utils/CustomRouter.js"
import { getAllPets, createPet } from "../../controllers/pets.controller.js"
import { readMockUsers, createMockUsers } from "../../controllers/usersmock.controller.js"
class MocksApiRouter extends CustomRouter {
    constructor() {
        super()
        this.init()
    }
    init = () => {
        this.read("/mockingpets", ["PUBLIC", "USER", "ADMIN"], getAllPets)
        this.create("/mockingpets", ["PUBLIC", "USER", "ADMIN"], createPet)
        this.read("/mockingusers", ["PUBLIC", "USER", "ADMIN"], readMockUsers)
        this.create("/generateData", ["PUBLIC", "USER", "ADMIN"], createMockUsers)
    }
}
const mocksRouter = new MocksApiRouter()
export default mocksRouter.getRouter()