import fs from "fs"
import { v4 as uuidv4 } from 'uuid';

export default class CartManager{
    #path=""
    constructor(JSONpath){
        this.#path=JSONpath
    }
    async #getCarts(){
        if(fs.existsSync(this.#path)){      
            return JSON.parse(await fs.promises.readFile(this.#path, {encoding:"utf-8"}))
        }else{
            throw new Error(`no se pudo encontrar el archivo.\n Asegúrese que path(${this.#path}) este inicializado y sea una dirección válida.`)
        }
    }
    
    async createCart(){
        let id=uuidv4()
        let newCart={
            id,
            products:[]
        }
        let carts = await this.#getCarts()
        carts.push(newCart)
        await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, 5))
        return newCart
    }

    async getCartById(searchId){
        let carts = await this.#getCarts()
        let cartById = carts.find(product => product.id === searchId)
        return cartById
    }

    async addToCart(productToAdd, cartToAdd){
        let carts = await this.#getCarts()
        productToAdd = {id:productToAdd.id, quantity:1}
        const index = carts.findIndex(cart=>cart.id===cartToAdd.id)
        if(index!==-1){
            const exists = carts[index].products.findIndex(product=> product.id === productToAdd.id)
            if(exists!==-1){
                carts[index].products[exists].quantity++
            }else{
                carts[index].products.push(productToAdd)
            }
            await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, 5))
        }
        return carts[index]
    }
}
