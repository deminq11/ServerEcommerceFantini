import fs from "fs"
import { v4 as uuidv4 } from 'uuid';

export default class ProductManager{
    #path=""
    constructor(JSONpath){
        this.#path=JSONpath
    }
    async getProducts(){
        if(fs.existsSync(this.#path)){      
            return JSON.parse(await fs.promises.readFile(this.#path, {encoding:"utf-8"}))
        }else{
            throw new Error(`no se pudo encontrar el archivo.\n Asegúrese que path(${this.#path}) este inicializado y sea una dirección válida.`)
        }
    }
    
    async addProduct(productToAdd){
        let products = await this.getProducts()
        let id=uuidv4()
        let newProduct={
            ...productToAdd,
            status: true,
            id
        }
        products.push(newProduct)
        await fs.promises.writeFile(this.#path, JSON.stringify(products, null, 5))
        return newProduct
    }

    async getProductById(searchId){
        let products = await this.getProducts()
        let productById = products.find(product => product.id === searchId)
        return productById
    }

    async modifyProduct(originalProduct, productChanges){
        let products = await this.getProducts()
        const index = products.findIndex(product=>product.id === originalProduct.id)
        if(index!==-1){
            products[index]={
                ...products[index],
                ...productChanges,
                id:products[index].id
            }
            await fs.promises.writeFile(this.#path, JSON.stringify(products, null, 5))
        }
        return products[index]
    }

    async deleteProduct(productById){
        let products = await this.getProducts()
        const index = products.findIndex(product => product.id === productById.id)
        if(index !== -1){
            products.splice(index, 1)
            await fs.promises.writeFile(this.#path, JSON.stringify(products, null, 5))
        }
        return productById
    }
}
