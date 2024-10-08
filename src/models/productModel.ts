import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true  
    },
    category: {
        type: mongoose.Schema.Types.String,
        ref: 'categories',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    },
    minThreshold: {
        type: Number,
        required: true
    },
    images: {
        type: [],
        required: true,
        default: []
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users",
        required: true
    },
    rating: {
        type: Number,
        required: false,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true,
        required: false,
    },
}, {
    timestamps: true
})

// delete old model if exists
if (mongoose.models && mongoose.models['products']) 
    delete mongoose.models['products']

export default mongoose.model("products", productSchema)
