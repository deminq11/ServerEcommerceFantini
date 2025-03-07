import {adoptionsService} from "../services/adoptions.service.js";

async function getAllAdoptions(req, res) {
    const response = await adoptionsService.readService()
    const message = "ADOPTIONS FOUND"
    return res.json200(message, response)
}

async function getAdoption(req, res) {
    const adoptionId = req.params.aid
    const response = await adoptionsService.readByIdService(adoptionId)
    const message = "ADOPTION FOUND"
    return res.json200(message, response)
}

async function createAdoption(req, res) {
    const { uid, pid } = req.body
    const response = await adoptionsService.createService(uid, pid)
    const message = "ADOPTION CREATED"
    return res.json201(message, response)
}

export { createAdoption, getAllAdoptions, getAdoption }