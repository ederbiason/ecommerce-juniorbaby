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
    size: {
        type: [Number],
        required: false,
        default: [1,2,3]
    }
}, {
    timestamps: true
})

productSchema.pre('save', function (next) {
    if (this.category !== 'Roupas') {
        this.size = undefined
    }
    next()
})

// delete old model if exists
if (mongoose.models && mongoose.models['products']) 
    delete mongoose.models['products']

export default mongoose.model("products", productSchema)
