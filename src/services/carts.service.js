import { create, readById, update, destroy } from "../dao/mongo/managers/carts.manager.js";

const createService = async (user_id) => await create(user_id);
const readService = async (cid) => await readById(cid);
const updateService = async (cid, cart) => await update(cid, cart);
const destroyService = async (cid) => await destroy(cid);

export { createService, readService, updateService, destroyService };