import { faker } from "@faker-js/faker"
import { createHashUtil } from "../utils/passwordHash.js"
import UserMockDTO from "../dto/UserMock.dto.js"
import crypto from "crypto"
export default function generateMockUsers(n) {
    if (n <= 0) {
        return []
    }
    let usersMock = []
    for (let i = 0; i < n; i++) {
        const hashedPassword = createHashUtil(faker.internet.password())
        const verifyCode = crypto.randomBytes(12).toString('hex')
        let user = {
            _id: faker.database.mongodbObjectId(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: hashedPassword,
            role: faker.helpers.arrayElement(['USER', 'ADMIN', 'PREM']),
            verifyCode: verifyCode,
            verify: faker.datatype.boolean()
        }
        user = UserMockDTO.getUserInputFrom(user)
        usersMock.push(user)
    }
    return usersMock
}