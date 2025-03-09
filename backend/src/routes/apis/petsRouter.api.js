import CustomRouter from "../../utils/CustomRouter.js"
import uploader from '../../utils/uploader.js';
import {createPet, createPetWithImage, getAllPets, updatePet, deletePet} from "../../controllers/pets.controller.js"

class PetsApiRouter extends CustomRouter {
    constructor() {
        super()
        this.init()
    }
    init = () => {
        this.create("/", ["ADMIN"], createPet)
        this.create("/withimage", ["ADMIN"], uploader.single('image'), createPetWithImage)
        this.read("/", ["PUBLIC"], getAllPets)
        this.update("/:uid", ["USER", "ADMIN"], updatePet)
        this.destroy("/:uid", ["ADMIN"], deletePet)
    }
}

const petsRouter = new PetsApiRouter()
export default petsRouter.getRouter()