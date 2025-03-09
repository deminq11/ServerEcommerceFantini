import { createTransport } from "nodemailer";
import crypto from "crypto"
const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {user: process.env.GOOGLE_EMAIL, pass: process.env.GOOGLE_PASS}
})

export const sendVerifyEmail = async ({to, verifyCode})=>{
    try {
        await transport.verify()
        await transport.sendMail({
            from: process.env.GOOGLE_EMAIL,
            to,
            subject: "Verificación de tu cuenta de Platypus",
            html: `
            <h1>Platypus</h1>
            <h2> Este es tu código de verificación:</h2>
            <p style="color: gray; font-size:20px">${verifyCode}</p>
            `
        })
    } catch (error) {
        throw error
    }
}
export const sendPasswordResetEmail = async ({to, resetToken})=>{
    try {
        await transport.verify()
        await transport.sendMail({
            from: process.env.GOOGLE_EMAIL,
            to,
            subject: `Recuperación de contraseña de tu cuenta de ${process.env.ECOMMERCE_NAME}`,
            html: `
            <h1>${process.env.ECOMMERCE_NAME}</h1>
            <h2> Entre al link para reestablecer su contraseña:</h2>
            <a href="${process.env.FRONTEND_URL}/reset-password/${resetToken}">Reestablecer contraseña...</a>
            `
        })
    } catch (error) {
        throw error
    }
}