import CustomRouter from "../../utils/CustomRouter.js"
import passportCb from "../../middlewares/passport/passportCb.mid.js"
import { register, verify, reSendVerifyCode, login, signout, current, sendPasswordReset, resetPassword } from "../../controllers/sessions.controller.js"
class SessionsApiRouter extends CustomRouter {
  constructor() {
    super()
    this.init()
  }
  init = () => {
    this.create("/register", ["PUBLIC"], passportCb("register"), register)
    this.create("/verify", ["PUBLIC"], verify)
    this.create("/resend-verify-code", ["PUBLIC"], reSendVerifyCode)
    this.create("/login", ["PUBLIC"], passportCb("login"), login)
    this.create("/signout", ["USER", "ADMIN"], passportCb("signout"), signout)
    this.read("/current", ["USER", "ADMIN"], current)
    this.create("/send-password-reset", ["PUBLIC"], sendPasswordReset)
    this.create("/reset-password/:resetToken", ["PUBLIC"], resetPassword)
  }
}

const sessionsRouter = new SessionsApiRouter()
export default sessionsRouter.getRouter()