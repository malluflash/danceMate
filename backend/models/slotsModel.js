import mongoose from "mongoose";
import { Schema }from "mongoose";


const slotsSchema = mongoose.Schema({
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
    capacity: {
        type: Number,
        required: true
    },
    isCancelled: {
        type: Boolean,
        required: true,    
    },
    danceForm: {
        type: String,
        required: true  
    },
    teacherName: {
        type: String,
        required: true  
    },
    creatorId: [{
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true   
    }],
    count: {
        type: Number,
    },

    }, { timestamps: true
    });


const Slots = mongoose.model('Slots', slotsSchema)

export default Slots;
