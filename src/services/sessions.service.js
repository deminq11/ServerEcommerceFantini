import { read, readByEmail, update } from "../dao/mongo/managers/users.manager.js";

const verifyService = async (email, verifyClientCode) => {
    const user = await readByEmail(email)
    const verifyUserCode = user.verifyCode
    if (verifyClientCode === verifyUserCode) {
        await update(user._id, { verify: true })
        return true
    }
    return false
}
const readVerifyCodeService = async (email) => {
    const user = await readByEmail(email)
    if (user.verifyCode) {
        return verifyCode
    }
    return false
}
const createResetTokenService = async (email, resetToken) => {
    const user = await readByEmail(email)
    if (user) {
        await update(user._id, { resetToken: resetToken })
        return resetToken
    }
    return false
}
const resetPasswordService = async (resetToken, newPassword) => {
    const response = await read({ resetToken: resetToken })
    const user = response[0]
    if (user) {
        await update(user._id, {password: newPassword, resetToken: null})
        return true
    }
    return false
}
export { verifyService, readVerifyCodeService, createResetTokenService, resetPasswordService }