import mongoose from "mongoose";

const schoolSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 100,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: Number,
        required: true,    
    },
    email: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true  
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
}, {timestamps: true});

const School = mongoose.model('School', schoolSchema);

export default School; 