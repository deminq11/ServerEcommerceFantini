import { create, read, update, destroy, readByEmail } from "../dao/mongo/managers/users.manager.js";

const createService = async (data) => await create(data);
const readService = async () => await read();
const readByEmailService = async (email) => await readByEmail(email);
const updateService = async (uid, data) => await update(uid, data);
const destroyService = async (uid) => await destroy(uid);


export { createService, readService, readByEmailService, updateService, destroyService }