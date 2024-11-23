import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        products:{
            type: [
                {
                    product: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "products",
                    },
                    quantity: { type: Number, required: true },
                }
            ]
        },
    },
    {  versionKey: false, collection:"carts"}
)
cartSchema.pre("findOne", function(){
    this.populate("products.product")
})
const Cart = mongoose.model("carts", cartSchema)
export default Cart