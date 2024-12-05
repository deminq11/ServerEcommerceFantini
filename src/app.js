import "dotenv/config.js"
import express from 'express'
import { engine } from 'express-handlebars';
import { indexRouter } from './routes/index.router.js';
import pathHandler from "./middlewares/pathHandler.mid.js"
import errorHandler from './middlewares/errorHandler.mid.js';
import dbConnect from './utils/dbConnect.js';
import cookieParser from "cookie-parser";

const PORT=process.env.PORT
const app=express();
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"))
app.use(cookieParser(process.env.SECRET_KEY))

app.use("/", indexRouter)

app.use(pathHandler)
app.use(errorHandler)


app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

app.get('',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})
const ready = ()=> {
    console.log(`Server escuchando en puerto ${PORT}`)
    dbConnect()
}
app.listen(PORT, ready)