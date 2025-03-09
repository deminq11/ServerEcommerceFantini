import { create, read, readById, update, destroy } from "../dao/mongo/managers/pets.manager.js";

const createService = async (data) => await create(data);
const readService = async () => await read();
const readByIdService = async (id) => await readById(id);
const updateService = async (id, data) => await update(id, data);
const destroyService = async (id) => await destroy(id);

export const petsService = { createService, readService, readByIdService, updateService, destroyService };
export { createService, readService, readByIdService, updateService, destroyService };