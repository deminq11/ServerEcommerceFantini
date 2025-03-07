import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
        products: {
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
        state: { type: String, enum: ["reserved", "paid", "delivered"], default: "reserved" }

    },
    {
        collection: "carts"
    }
)
cartSchema.pre("findOne", function () {
    this.populate("products.product")
})
const Cart = mongoose.model("carts", cartSchema)
export default Cart