import crypto from "crypto"
import { verifyService, readVerifyCodeService, createResetTokenService, resetPasswordService } from "../services/sessions.service.js"
import { sendPasswordResetEmail, sendVerifyEmail } from "../utils/nodeMailer.js"
import { createHashUtil } from "../utils/passwordHash.js"

async function register(req, res, next) {
    const { _id } = req.user
    const message = "User Registered"
    const response = _id
    return res.json201(message, response)
}
async function verify(req, res, next) {
    const { email, verifyClientCode } = req.body
    const response = await verifyService(email, verifyClientCode)
    if (response) {
        const message = "User Verified"
        return res.json200(message, response)
    } else {
        const message = "User Verification Failed"
        return res.json401(message, response)
    }
}
async function reSendVerifyCode(req, res, next) {
    const { email } = req.body
    const { verifyCode } = readVerifyCodeService(email)
    if (response) {
        await sendVerifyEmail({ to: email, verifyCode })
        const message = "Verification Code Sent"
        return res.json200(message, response)
    } else {
        const message = "Code Send Failed"
        return res.json401(message, response)
    }
}
async function login(req, res, next) {
    const { token } = req.user
    const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true }
    const message = "User logged in"
    const response = "OK"
    return res.cookie("token", token, opts).json200(message, response)
}
function signout(req, res, next) {
    const message = "User signed out"
    const response = "OK"
    return res.clearCookie("token").json200(message, response)
}
async function current(req, res, next) {
    const user = req.user
    delete user.password
    const response = user
    if (user.isOnline) {
        const message = "ONLINE"
        return res.json200(message, response)
    } else {
        const message = "OFFLINE"
        return res.json400(message)
    }
}
async function sendPasswordReset(req, res, next) {
    const { email } = req.body
    if (!email) {
        const message = "Please enter the email address"
        return res.json400(message)
    }
    const resetToken = crypto.randomBytes(20).toString('hex');
    const response = await createResetTokenService(email, resetToken)
    if (response) {
        const message = "Reset Token Generated"
        await sendPasswordResetEmail({ to: email, resetToken })
        return res.json200(message, response)
    } else {
        const message = "Reset Token Generation Failed"
        return res.json400(message)
    }
}
async function resetPassword(req, res, next) {
    const { resetToken } = req.params
    const { password } = req.body
    const hashedPassword = createHashUtil(password)
    const response = await resetPasswordService(resetToken, hashedPassword)
    if (response) {
        const message = "Password Reset Succesful"
        return res.json200(message, response)
    } else {
        const message = "Password Reset Failed"
        return res.json400(message)
    }
}

export { register, verify, reSendVerifyCode, login, signout, current, sendPasswordReset, resetPassword }