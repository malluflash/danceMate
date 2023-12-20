import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Validator from "validator";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength:35,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: Validator.isEmail
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password must be at least 8 chars']    
    },
    contactNumber: {
        type: Number,
        required: true,    
    },
    role: {
        default: 'student',
        type: String,
        required: true,    
    },
    isActive: {
        type: Boolean,
        required: true  
    }, 

    }, {timestamps: true
    });

userSchema.pre('save', async function (next){
    if(!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema)

export default User;



