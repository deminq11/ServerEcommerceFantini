import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        photo: {type: String, default: null},
        name: { type: String },
        email: { type: String, required: true, index: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: 'USER', enum: ['USER', 'ADMIN', 'PREM'] },
        isOnline: { type: Boolean, default: false }
    },
    {
        collection: "users"
    }
)

const Cart = mongoose.model("users", userSchema)
export default Cart