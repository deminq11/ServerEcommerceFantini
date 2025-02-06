import {mockService, createService} from "../services/usersMock.service.js"
async function readMockUsers(req, res) {
    const users = req.body.users ? req.body.users : 50
    if (isNaN(users)) {
        const message = "USERS PARAMETER IS NOT NUMERIC"
        res.json400(message)
    }
    const response = await mockService(users)
    const message = "USERS MOCKED SUCCESFULLY"
    return res.json200(message, response)
}
async function createMockUsers(req, res) {
    let { users, pets } = req.body
    if (users === undefined || users === null || users === "") users = 0
    if (pets === undefined || pets === null || pets === "") pets = 0
    if (isNaN(users)) {
        const message = "USERS OR PETS PARAMETER IS NOT NUMERIC"
        res.json400(message)
    }
    if(users <= 0 && pets <= 0){
        const message = "CANT INPUT 0 OR LESS ON BOTH PARAMETERS"
        res.json400(message)
    }
    const response = await createService(users, pets)
    if (response) {
        const message = "MOCK UPLOADED SUCCESFULLY"
        return res.json201(message, response)
    }
}

export { readMockUsers, createMockUsers }