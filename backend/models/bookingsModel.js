import mongoose, { Schema } from "mongoose";


const bookingsSchema = mongoose.Schema({
    slotId: {
        type: String,
        required: true
    }, 
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,    
    },
    bookedBy: {
        type: String,
        required: true,
    },
    danceType: {
        type: String,
        required: true,
    },
    teacher: {
        type: String,
        required: true,
    },
    dateOfEvent: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    
    isCancelled: {
        default: false,
        type: Boolean,
        required: true
    }, 
    
},{ timestamps: true
    });

    


const Bookings = mongoose.model('Bookings', bookingsSchema)

export default Bookings;