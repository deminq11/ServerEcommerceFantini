import request from 'supertest';
import express from 'express';
import cookieParser from "cookie-parser";
import adoptionsRouter from '../../src/routes/apis/adoptionsRouter.api.js';
import { verifyTokenUtil } from '../../src/utils/jsonToken.js';
import pathHandler from '../../src/middlewares/pathHandler.mid.js';
import errorHandler from '../../src/middlewares/errorHandler.mid.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Adoption from '../../src/dao/mongo/models/adoptionsModel.js';
import Pet from '../../src/dao/mongo/models/petsModel.js';
import User from '../../src/dao/mongo/models/usersModel.js';

jest.mock('../../src/utils/jsonToken.js')

let app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use('/api/adoptions', adoptionsRouter)
app.use(pathHandler)
app.use(errorHandler)



describe('Adoptions API Router Integration', () => {
    let mongoServer
    let user

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create()
        const mongoUri = mongoServer.getUri()
        await mongoose.connect(mongoUri)
        user = await User.create({
            name: 'Pepito',
            email: 'pepito@example.com',
            password: 'pepi123',
            verifyCode: '123',
            verify: true
        })
    })

    beforeEach(async () => {
        jest.clearAllMocks()
        await Adoption.deleteMany({})
    });

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoServer.stop()
    })

    describe("GET /api/adoptions", () => {
        it('should return all adoptions', async () => {
            verifyTokenUtil.mockReturnValue({ role: 'ADMIN', user_id: user._id.toString() })
            const adoption1 = await Adoption.create({})
            const adoption2 = await Adoption.create({})
            const response = await request(app)
                .get('/api/adoptions')
                .set('Cookie', 'token=testToken')
            expect(response.status).toBe(200);
            expect(response.body.message).toEqual("ADOPTIONS FOUND")
            expect(response.body.response).toEqual([{
                _id: adoption1._id.toString(),
                __v: 0,
            },
            {
                _id: adoption2._id.toString(),
                __v: 0,
            },
            ])
        })
    })

    describe("GET /api/adoptions/:aid", () => {
        it('should return the correct adoption', async () => {
            verifyTokenUtil.mockReturnValue({ role: 'ADMIN', user_id: user._id.toString() })
            const adoption1 = await Adoption.create({})
            const adoptionId = adoption1._id.toString()
            const response = await request(app)
                .get(`/api/adoptions/${adoptionId}`)
                .set('Cookie', 'token=testToken')
            expect(response.status).toBe(200)
            expect(response.body.message).toEqual("ADOPTION FOUND")
            expect(response.body.response._id).toEqual(adoptionId)
        })
    })

    describe("POST /api/adoptions", () => {
        it('should create a new adoption', async () => {
            verifyTokenUtil.mockReturnValue({ role: 'ADMIN', user_id: user._id.toString() })
            const pet = await Pet.create({
                name: 'Pistachito',
                specie: 'Pseudorca crassidens'
            });
            const response = await request(app)
                .post('/api/adoptions')
                .send({ uid: user._id.toString(), pid: pet._id.toString() })
                .set('Cookie', 'token=testToken')
            expect(response.status).toBe(201);
            expect(response.body.message).toEqual("ADOPTION CREATED")
            expect(response.body.response).toEqual(
                {
                    __v: 0,
                    _id: response.body.response._id.toString(),
                    owner: user._id.toString(),
                    pet: pet._id.toString()
                }
            )
        });
    });
});