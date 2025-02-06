import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        specie: { type: String, required: true },
        birthDate: Date,
        adopted: { type: Boolean, default: false },
        owner: { type: mongoose.SchemaTypes.ObjectId, ref: 'users' },
        image: String
    },
    {
        collection: "pets"
    }
)

const Pet = mongoose.model("pets", schema);

export default Pet;