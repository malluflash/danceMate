import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../../utils/generateToken.js';


// @description Auth user/set token
// route        POST/api/users/auth
// @access      Public
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({ email}).populate('school', 'name');

    if(user && (await user.matchPassword(password))) {
        // Reject superadmin login attempts - they must use /api/superadmin/auth
        if (user.role === 'superadmin') {
            res.status(403);
            throw new Error('Super admin must use the super admin login route');
        }

        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            contactNumber: user.contactNumber,
            school: user.school
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }

});

// @description Register a new User
// route        POST/api/users
// @access      Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email,
        password, contactNumber,
        role, isActive, school} = req.body;

    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // By default, new users will be students and inactive until approved
    const userRole = role || 'student';

    const user = await User.create({
        name,
        email,
        password,
        contactNumber,
        role: userRole,
        isActive: false,
        school
    });

    if(user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            contactNumber: user.contactNumber,
            school: user.school
        });
    } else {
        res.status(400);
        throw new Error('Invalid User data');
    }

});

// @description Logout User
// route        POST/api/users/logout
// @access      Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
    });
    res.status(200).json({message: 'Succesfully Logged out'})
});

// @description View the user profile
// route        GET/api/users/profile
// @access      Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate('school', 'name');
    
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        contactNumber: user.contactNumber,
        role: user.role,
        school: user.school
    });
});

// @description Update the user profile
// route        PUT/api/users/profile
// @access      Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.contactNumber = req.body.contactNumber || user.contactNumber;
        
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            contactNumber: updatedUser.contactNumber,
            role: updatedUser.role,
            school: updatedUser.school
        });

    } else {
        res.status(404);
        throw new Error('User not found')
    }
});



export {registerUser,
        authUser,
        logoutUser,
        getUserProfile,
        updateUserProfile
    };