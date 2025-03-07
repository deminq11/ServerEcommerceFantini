import Pet from "../models/petsModel.js";
import Manager from "./manager.js";

const petsManager = new Manager(Pet)
const { create, read, readById, update, destroy } = petsManager

export { create, read, readById, update, destroy }