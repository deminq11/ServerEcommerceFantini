import { createService as createUsers } from "../services/users.service.js";
import { createService as createPets } from "../services/pets.service.js"
import generateMockUsers from "../mocks/generateMockUsers.js"
import generateMockPets from "../mocks/generateMockPets.js"
const mockService = async (users = 50, pets = null) => {
    const result = {};
    const usersMock = users > 0 ? generateMockUsers(users) : null
    const petsMock = pets && pets > 0 ? generateMockPets(pets) : null
    if (usersMock) {
        result.usersMock = usersMock;
    }
    if (petsMock) {
        result.petsMock = petsMock;
    }
    if (Object.keys(result).length === 0) {
        throw new Error("ERROR GENERATING MOCK")
    }
    return result
}

const createService = async (users, pets) => {
    let { petsMock, usersMock } = await mockService(users, pets)
    let result = {}
    if(usersMock){
        result.usersMock = await createUsers(usersMock) 
    }
    if(petsMock){
        result.petsMock = await createPets(petsMock) 
    }
    if (Object.keys(result).length === 0) {
        throw new Error("ERROR UPLOADING MOCK")
    }
    return result 
}

export { mockService, createService };