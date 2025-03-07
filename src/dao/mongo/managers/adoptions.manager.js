import Adoption from "../models/adoptionsModel.js";
import Manager from "./manager.js";

const AdoptionsManager = new Manager(Adoption)
const { create, read, readById, update, destroy } = AdoptionsManager

export { create, read, readById, update, destroy }