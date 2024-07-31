import mongoose from "mongoose"

export const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
        required: false,
    },
},
    {
        timestamps: true,
})

 export default mongoose.models['categories'] || mongoose.model("categories", categorySchema)
