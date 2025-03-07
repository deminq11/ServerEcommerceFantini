import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { create, read, readById, update, destroy } from '../../src/dao/mongo/managers/adoptions.manager.js';

let mongoServer
describe('AdoptionDAO', () => {
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create()
        const mongoUri = mongoServer.getUri()
        await mongoose.connect(mongoUri)
    })
    afterAll(async () => {
        await mongoose.disconnect()
        await mongoServer.stop()
    })
    describe('create', () => {
        it('should save an adoption to the database', async () => {
            const ownerId = new mongoose.Types.ObjectId("64e83c7b399123456789abcd")
            const petId = new mongoose.Types.ObjectId("64e83c7b399123456789abcf")
            const adoption = await create({
                owner: ownerId,
                pet: petId,
            })
            expect(adoption).toHaveProperty('_id')
            expect(adoption).toHaveProperty('owner')
            expect(adoption).toHaveProperty('pet')
            expect(adoption.owner).toEqual(ownerId)
            expect(adoption.pet).toEqual(petId)
        })
    })
    describe('read', () => {
        it('should read and return an adoption from the database', async () => {
            const ownerId = new mongoose.Types.ObjectId("64e83c7b399123456789abcd")
            const petId = new mongoose.Types.ObjectId("64e83c7b399123456789abcf")
            const adoption = await create({
                owner: ownerId,
                pet: petId,
            })
            const result = await read()
            expect(result).toBeInstanceOf(Array)
            expect(result[0]).toHaveProperty('owner')
            expect(result[0]).toHaveProperty('pet')
            expect(result[0].owner).toEqual(ownerId)
            expect(result[0].pet).toEqual(petId)
        })
    })
    describe('readById', () => {
        it('should read and return by id an adoption from the database', async () => {
            const ownerId = new mongoose.Types.ObjectId("64e83c7b399123456789abcd")
            const petId = new mongoose.Types.ObjectId("64e83c7b399123456789abcf")
            const adoption = await create({
                owner: ownerId,
                pet: petId,
            })
            const result = await readById(adoption._id)
            expect(result).toHaveProperty('_id')
            expect(result).toHaveProperty('owner')
            expect(result).toHaveProperty('pet')
            expect(result.owner).toEqual(adoption.owner)
            expect(result.pet).toEqual(adoption.pet)
        })
    })
})
