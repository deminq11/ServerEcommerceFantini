import { create, read, readById, update, destroy, readByEmail } from "../dao/mongo/managers/users.manager.js";

const createService = async (data) => await create(data);
const readService = async () => await read();
const readByIdService = async (uid) => await readById(uid);
const readByEmailService = async (email) => await readByEmail(email);
const updateService = async (uid, data) => await update(uid, data);
const destroyService = async (uid) => await destroy(uid);

export const usersService = { createService, readService, readByIdService, readByEmailService, updateService, destroyService }
export { createService, readService, readByIdService, readByEmailService, updateService, destroyService }
