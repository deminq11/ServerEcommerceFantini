import { create, read, readById, update, destroy } from "../dao/mongo/managers/adoptions.manager.js";
import { petsService } from "./pets.service.js";
import { usersService } from "./users.service.js";

const createService = async (uid, pid) => {
    const user = await usersService.readByIdService(uid)
    if (!user) throw new Error("USER NOT FOUND")
    const pet = await petsService.readByIdService(pid)
    if (!pet) throw new Error("PET NOT FOUND")
    if (pet.adopted) throw new Error("PET IS ALREADY ADOPTED")
    user.pets.push(pet._id);
    await usersService.updateService(user._id, { pets: user.pets })
    await petsService.updateService(pet._id, { adopted: true, owner: user._id })
    return await create({ owner: user._id, pet: pet._id });
};
const readService = async () => await read()
const readByIdService = async (id) => await readById(id);
const updateService = async (id, data) => await update(id, data);
const destroyService = async (id) => await destroy(id);

export const adoptionsService = { createService, readService, readByIdService, updateService, destroyService };
export { createService, readService, readByIdService, updateService, destroyService };