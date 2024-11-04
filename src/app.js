import express from 'express'
import { engine } from 'express-handlebars';
import {router as productsRouter} from "./routes/productsRouter.js"
import {router as cartsRouter}from "./routes/cartsRouter.js"
import {router as vistasRouter}from "./routes/vistasRouter.js"
import {router as realTimeProducts}from "./routes/realTimeProducts.js"
import {Server} from "socket.io"

const PORT=3000;
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/products", vistasRouter)
app.use("/realtimeproducts", realTimeProducts)

app.use(express.static("./src/public"))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

app.get('',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
export const io = new Server(server)
io.on("connection", socket=>{
    console.log(`Se conectó un cliente con id ${socket.id}`)
})