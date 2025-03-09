import passport from "passport"
import crypto from "crypto"
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { create, readByEmail, update, } from "../../dao/mongo/managers/users.manager.js"
import { createHashUtil, verifyHashUtil } from "../../utils/passwordHash.js"
import { createTokenUtil } from "../../utils/jsonToken.js"
import { sendVerifyEmail } from "../../utils/nodeMailer.js";

passport.use(
    "register",
    new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: "email",
        },
        async (req, email, password, done) => {
            try {
                const user = await readByEmail(email)
                if (user) {
                    const info = { message: "USER ALREADY EXISTS", statusCode: 409 }
                    return done(null, false, info)
                }
                const hashedPassword = createHashUtil(password)
                const verifyCode = crypto.randomBytes(12).toString('hex')
                const newUser = await create({
                    email,
                    password: hashedPassword,
                    name: req.body.name || "User",
                    verifyCode: verifyCode
                })
                await sendVerifyEmail({ to: email, verifyCode })
                return done(null, newUser)
            } catch (error) {
                return done(error)
            }
        }
    )
)
passport.use(
    "login",
    new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
            try {
                const user = await readByEmail(email)
                if (!user) {
                    const info = { message: "USER NOT FOUND", statusCode: 404 }
                    return done(null, false, info)
                }
                if (user.isOnline) {
                    const info = { message: "USER ALREADY LOGGED IN", statusCode: 409 }
                    return done(null, false, info)
                }
                if (!user.verify) {
                    const info = { message: "USER NOT VERIFIED", statusCode: 401 }
                    return done(null, false, info)
                }
                const passwordForm = password
                const passwordDb = user.password
                const verify = verifyHashUtil(passwordForm, passwordDb)
                if (!verify) {
                    const info = { message: "INVALID CREDENTIALS", statusCode: 401 }
                    return done(null, false, info)
                }
                const data = {
                    user_id: user._id,
                }
                const token = createTokenUtil(data)
                user.token = token
                await update(user._id, { isOnline: true })
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    )
)
passport.use(
    "signout",
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
            secretOrKey: process.env.SECRET_KEY,
        },
        async (data, done) => {
            try {
                const { user_id } = data;
                await update(user_id, { isOnline: false });
                return done(null, { user_id: null });
            } catch (error) {
                return done(error);
            }
        }
    )
);
export default passport