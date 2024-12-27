import { create, read, readById, update, destroy } from "../dao/mongo/managers/products.manager.js";

const createService = async (data) => await create(data);
const readService = async (queryCriteria, limit, page, sortCriteria) => await read(queryCriteria, limit, page, sortCriteria);
const readServiceById = async (pid) => await readById(pid);
const updateService = async (pid, data) => await update(pid, data);
const destroyService = async (pid) => await destroy(pid);

export { createService, readService, readServiceById, updateService, destroyService };