import { createService, destroyService, readService, updateService } from "../services/users.service.js"

async function createUser(req, res) {
    const message = "USER CREATED"
    const data = req.body
    const response = await createService(data)
    return res.json201(message, response)
}
async function readUsers(req, res) {
    const message = "USERS FOUND"
    const response = await readService()
    return res.json200(message, response)
}
async function updateUser(req, res) {
    const { uid } = req.params
    const data = req.body
    const message = "USER UPDATED"
    const response = await updateService(uid, data)
    return res.json200(message, response)
}
async function destroyUser(req, res) {
    const { uid } = req.params
    const message = "USER DELETED"
    const response = await destroyService(uid)
    return res.json200(message, response)
}
export {createUser, readUsers, updateUser, destroyUser}