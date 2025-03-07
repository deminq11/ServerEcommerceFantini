import {createService, readService, readByIdService, updateService, destroyService} from '../../src/services/adoptions.service.js';
import {petsService} from '../../src/services/pets.service.js';
import {usersService} from '../../src/services/users.service.js';
import * as adoptionsManager  from '../../src/dao/mongo/managers/adoptions.manager.js';

jest.mock('../../src/dao/mongo/managers/adoptions.manager.js')
jest.mock('../../src/services/pets.service.js')
jest.mock('../../src/services/users.service.js')

describe('AdoptionService', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    describe('createService', () => {
        it('should create an adoption if user and pet exist and arent already adopted', async () => {
            const userId = 'user123'
            const petId = 'pet456'
            const user = { _id: userId, pets: [] }
            const pet = { _id: petId, adopted: false }
            const createdAdoption = { owner: userId, pet: petId }

            usersService.readByIdService.mockResolvedValue(user)
            petsService.readByIdService.mockResolvedValue(pet)
            adoptionsManager.create.mockResolvedValue(createdAdoption)

            const result = await createService(userId, petId)

            expect(usersService.readByIdService).toHaveBeenCalledWith(userId)
            expect(petsService.readByIdService).toHaveBeenCalledWith(petId)
            expect(usersService.updateService).toHaveBeenCalledWith(userId, { pets: [petId] })
            expect(petsService.updateService).toHaveBeenCalledWith(petId, { adopted: true, owner: userId })
            expect(adoptionsManager.create).toHaveBeenCalledWith({ owner: userId, pet: petId })
            expect(result).toEqual(createdAdoption)
        })

        it('should throw an error if user does not exist', async () => {
            const userId = 'user123'
            const petId = 'pet456'

            usersService.readByIdService.mockResolvedValue(null)

            await expect(createService(userId, petId)).rejects.toThrow('USER NOT FOUND')
        })

        it('should throw an error if pet does not exist', async () => {
            const userId = 'user123'
            const petId = 'pet456'
            const user = { _id: userId, pets: [] }

            usersService.readByIdService.mockResolvedValue(user)
            petsService.readByIdService.mockResolvedValue(null)

            await expect(createService(userId, petId)).rejects.toThrow('PET NOT FOUND')
        })
        it('should throw an error if pet is already adopted', async () => {
            const userId = 'user123'
            const petId = 'pet456'
            const user = { _id: userId, pets: [] }
            const pet = { _id: petId, adopted: true }

            usersService.readByIdService.mockResolvedValue(user)
            petsService.readByIdService.mockResolvedValue(pet)

            await expect(createService(userId, petId)).rejects.toThrow('PET IS ALREADY ADOPTED')
        })
    })
    describe('readService', () => {
        it('should return all adoptions', async () => {
            const adoptions = [{ _id: 'adoption1' }, { _id: 'adoption2' }]
            adoptionsManager.read.mockResolvedValue(adoptions)

            const result = await readService()

            expect(adoptionsManager.read).toHaveBeenCalled()
            expect(result).toEqual(adoptions)
        })
    })

    describe('readByIdService', () => {
        it('should return an adoption by ID', async () => {
            const adoptionId = 'adoption123'
            const adoption = { _id: adoptionId }
            adoptionsManager.readById.mockResolvedValue(adoption)

            const result = await readByIdService(adoptionId)

            expect(adoptionsManager.readById).toHaveBeenCalledWith(adoptionId)
            expect(result).toEqual(adoption)
        })
    })

    describe('updateService', () => {
        it('should update an adoption', async () => {
            const adoptionId = 'adoption123'
            const updatedData = { status: 'completed' }
            const updatedAdoption = { _id: adoptionId, ...updatedData }
            adoptionsManager.update.mockResolvedValue(updatedAdoption)

            const result = await updateService(adoptionId, updatedData)

            expect(adoptionsManager.update).toHaveBeenCalledWith(adoptionId, updatedData)
            expect(result).toEqual(updatedAdoption)
        })
    })

    describe('destroyService', () => {
        it('should delete an adoption', async () => {
            const adoptionId = 'adoption123'
            adoptionsManager.destroy.mockResolvedValue(true)

            await destroyService(adoptionId)

            expect(adoptionsManager.destroy).toHaveBeenCalledWith(adoptionId)
        })
    })
})

