import CustomRouter from "../../utils/CustomRouter.js"
import passportCb from "../../middlewares/passport/passportCb.mid.js"

class SessionsApiRouter extends CustomRouter {
  constructor() {
    super()
    this.init()
  }
  init = () => {
    this.create("/register", ["PUBLIC"], passportCb("register"), register)
    this.create("/login", ["PUBLIC"], passportCb("login"), login)
    this.create("/signout", ["USER", "ADMIN"], passportCb("signout"), signout)
    this.create("/current", ["USER", "ADMIN"], current)
  }
}

const sessionsRouter = new SessionsApiRouter()
export default sessionsRouter.getRouter()

async function register(req, res, next) {
  const { _id } = req.user
  const message = "User Registered!"
  const response = _id
  return res.json201(message, response)
}
async function login(req, res, next) {
  const { token } = req.user
  const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true }
  const message = "User logged in!"
  const response = "OK"
  return res.cookie("token", token, opts).json200(message, response)
}
function signout(req, res, next) {
  const message = "User signed out!"
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
    return res.json400(message, response)
  }
}
