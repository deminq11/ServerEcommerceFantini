import Product from "../models/productsModel.js";
import Manager from "./manager.js";

class ProductsManager extends Manager{
    constructor(model) {
        super(model);
    }
    read = async(query = {}, limit = 10, page = 1, sort = {}, select={})=>{
        try {
            const all = await this.model.paginate(query,{page, limit, sort, select, lean:true})
            return all
        } catch (error) {
            throw error
        }
    }
}

const productsManager = new ProductsManager(Product)

const { create, read, readById, update, destroy } = productsManager

export { create, read, readById, update, destroy }