import "dotenv/config.js"
import express from 'express'
import { indexRouter } from './routes/index.router.js';
import pathHandler from "./middlewares/pathHandler.mid.js"
import errorHandler from './middlewares/errorHandler.mid.js';
import cookieParser from "cookie-parser";
import cors from "cors"
import morgan from "morgan";
import dbConnect from "./utils/dbConnect.js"

const app=express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(cookieParser(process.env.SECRET_KEY))
app.use(cors({
    origin: true,
    credentials: true
}))

app.use("/", indexRouter)
app.use(pathHandler)
app.use(errorHandler)

const PORT=process.env.PORT
const ready = ()=> {
    console.log(`Server escuchando en puerto ${PORT}`)
    dbConnect()
}
app.listen(PORT, ready)
export default app