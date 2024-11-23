import { Router } from "express";
import { create, read, readById, update, destroy } from "../../data/mongo/managers/products.manager.js";

export const productsView = Router()

productsView.get("/", readProducts)

async function readProducts(req, res, next) {
    try {
        let {limit, page, sort, query} = req.query
        let sortCriteria = {}
        let queryCriteria = query? JSON.parse(query) : {}
        if (sort) {
            if (sort === "1" || sort === "-1") {
                sortCriteria = { price: parseInt(sort, 10) };
            } else {
                sortCriteria = JSON.parse(sort);
            }
        }
        const { docs, pagingCounter, totalDocs, totalPages, hasNextPage, hasPrevPage, prevPage, nextPage} = await read(queryCriteria, limit, page, sortCriteria)
        const products = docs
        return res.status(200).render("index", {products, totalPages, hasNextPage, hasPrevPage, prevPage, nextPage} )
    } catch (error) {
        return next(error)
    }
}

