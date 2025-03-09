import { createService, readService, updateService, destroyService } from "../services/pets.service.js"
import PetDTO from "../dto/Pet.dto.js"
import __dirname from "../utils/dirname.js"

const getAllPets = async (req, res) => {
    const response = await readService()
    const message = "PETS FOUND"
    return res.json200(message, response)
}

const createPet = async (req, res) => {
    const { name, specie, birthDate } = req.body
    if (!name || !specie || !birthDate) {
        return res.json400("MISSING VALUES IN BODY")
    }
    const pet = PetDTO.getPetInputFrom({ name, specie, birthDate })
    const message = "PET CREATED"
    const response = await createService(pet)
    return res.json201(message, response)
}

const updatePet = async (req, res) => {
    const petUpdateBody = req.body
    const petId = req.params.pid
    const message = "PET UPDATED"
    const response = await updateService(petId, petUpdateBody)
    return res.json200(message, response)
}

const deletePet = async (req, res) => {
    const petId = req.params.pid
    const message = "PET DELETED"
    const response = await destroyService(petId)
    return res.json200(message, response)
}

const createPetWithImage = async (req, res) => {
    const file = req.file
    const { name, specie, birthDate } = req.body
    if (!name || !specie || !birthDate) {
        return res.json400("MISSING VALUES IN BODY")
    }
    const pet = PetDTO.getPetInputFrom({
        name,
        specie,
        birthDate,
        image: `${__dirname}/../public/img/${file.filename}`
    })
    const message = "PET WITH IMAGE CREATED"
    const response = await createService(pet)
    res.json201(message, response)
}
export { getAllPets, createPet, updatePet, deletePet, createPetWithImage }