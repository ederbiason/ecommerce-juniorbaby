import mongoose from "mongoose"

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,  
        required: false, 
    },
    deliveryAddresses: {
        type: Array,
        default: [],
        required: false
    },

    isActive: {
        type: Boolean,
        default: true,
        required: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: false
    }
},
    {
        timestamps: true,
})

export default mongoose.models['users'] || mongoose.model("users", userSchema)
