import app from "./src/app.js"
import dbConnect from "./src/utils/dbConnect.js"

const PORT=process.env.PORT
const ready = ()=> {
    console.log(`Server escuchando en puerto ${PORT}`)
    dbConnect()
}
app.listen(PORT, ready)