import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema({
    owner:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Users'
    },
    pet:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'pets'
    }
},
{
    collection: "adoptions"
}

)

const Adoption = mongoose.model("adoptions",adoptionSchema);
adoptionSchema.pre("findOne", function () {
    this.populate("owner")
    this.populate("pet")
})
adoptionSchema.pre("create", function () {
    this.populate("owner")
    this.populate("pet")
})
export default Adoption;