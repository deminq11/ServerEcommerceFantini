import mongoose from "mongoose"
import paginate from "mongoose-paginate-v2"

const productSchema= new mongoose.Schema(
    {
        title:{type:String, required:true},
        description:String,
        price:{type:Number, required:true},
        code:{type: String, unique: true, required:true},
        status: {type:Boolean, default:true},
        stock:{type: Number, default:10},
        category:{type:String, default:"Electronica"},
        thumbnails: Array,
    },
    {
        versionKey: false,
        collection:"products"
    }
)
productSchema.plugin(paginate)
const Product = mongoose.model("products", productSchema)
export default Product