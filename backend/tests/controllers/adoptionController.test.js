import { createAdoption, getAllAdoptions, getAdoption } from '../../src/controllers/adoption.controller.js';
import { adoptionsService } from '../../src/services/adoptions.service.js';

jest.mock('../../src/services/adoptions.service.js')

describe('Adoptions Controller', () => {
    let req, res;

    beforeEach(() => {
        req = { params: {} , body:{}};
        res = {
            json200: jest.fn(),
            json201: jest.fn(),
        };
        jest.clearAllMocks();
    });

    describe('getAllAdoptions', () => {
        it('should return all adoptions with 200 status', async () => {
            const adoptions = [{ _id: 'adoption1' }, { _id: 'adoption2' }];
            adoptionsService.readService.mockResolvedValue(adoptions);

            await getAllAdoptions(req, res);

            expect(adoptionsService.readService).toHaveBeenCalled();
            expect(res.json200).toHaveBeenCalledWith('ADOPTIONS FOUND', adoptions);
        });
    });

    describe('getAdoption', () => {
        it('should return a single adoption with 200 status', async () => {
            const adoptionId = 'adoption123';
            const adoption = { _id: adoptionId };
            req.params.aid = adoptionId;
            adoptionsService.readByIdService.mockResolvedValue(adoption);

            await getAdoption(req, res);

            expect(adoptionsService.readByIdService).toHaveBeenCalledWith(adoptionId);
            expect(res.json200).toHaveBeenCalledWith('ADOPTION FOUND', adoption);
        });
    });

    describe('createAdoption', () => {
        it('should create an adoption with 201 status', async () => {
            const userId = 'user123';
            const petId = 'pet456';
            const createdAdoption = { owner: userId, pet: petId };
            req.body.uid = userId;
            req.body.pid = petId;
            adoptionsService.createService.mockResolvedValue(createdAdoption);

            await createAdoption(req, res);
            expect(adoptionsService.createService).toHaveBeenCalledWith(userId, petId);
            expect(res.json201).toHaveBeenCalledWith('ADOPTION CREATED', createdAdoption);
        });
    });
});