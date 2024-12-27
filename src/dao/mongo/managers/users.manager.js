import User from "../models/usersModel.js";
import Manager from "./manager.js";

const usersManager = new Manager(User)
const { create, read, readByEmail, readById, update, destroy } = usersManager

export { create, read, readByEmail, readById, update, destroy }