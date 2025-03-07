import { faker } from "@faker-js/faker"
import PetDTO from "../dto/Pet.dto.js"
export default function generateMockPets(n){
    if (n <= 0) {
        return []
    }
    let petsMock = []
    for (let i = 0; i < n; i++) {
        let pet = {
            name: faker.person.firstName(),
            specie: faker.animal.type(),
            birthDate: faker.date.birthdate(),
        }
        pet = PetDTO.getPetInputFrom(pet)
        petsMock.push(pet)
    }
    return petsMock
}