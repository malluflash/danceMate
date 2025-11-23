import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import School from "../models/schoolModel.js";
import generateToken from "../../utils/generateToken.js";

// GET user profiles
// For the super admin to view all users
const viewUserList = asyncHandler(async (req, res) => {
  try {
    const userList = await User.find({}).populate('school', 'name');
    res.status(201).json(userList);
  } catch (error) {
    console.error("Error fetching user list:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Toggle user isActive status and update user role
// Only the super admin can update to any role including school admin
const toggleUserStatusAndRole = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { role, isActive, schoolId } = req.body;

  try {
    const user = await User.findById(userId);

    if (user) {
      if (isActive !== undefined) {
        user.isActive = isActive;
      }

      if (role !== undefined) {
        // Validate role
        if (['superadmin', 'schooladmin', 'teacher', 'student'].includes(role)) {
        user.role = role;
        } else {
          return res.status(400).json({ message: "Invalid role" });
        }
      }

      // If role is being changed to or from school admin, handle school association
      if (role === 'schooladmin' && schoolId) {
        // Ensure the school exists
        const school = await School.findById(schoolId);
        if (!school) {
          return res.status(404).json({ message: "School not found" });
        }
        
        user.school = schoolId;
        
        // Update school with this admin
        school.adminId = userId;
        await school.save();
      }
      
      // For teacher or student, ensure they have a school
      if ((role === 'teacher' || role === 'student') && schoolId) {
        // Ensure the school exists
        const school = await School.findById(schoolId);
        if (!school) {
          return res.status(404).json({ message: "School not found" });
        }
        
        user.school = schoolId;
      }

      await user.save();

      res.status(200).json({ 
        message: "User status and role updated successfully", 
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          school: user.school
        } 
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user status and role:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @description Auth super admin/set token
// route        POST/api/superadmin/auth
// @access      Public (but only superadmin can login)
const authSuperAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).populate('school', 'name');

  if (user && (await user.matchPassword(password))) {
    // Check if user is superadmin
    if (user.role !== 'superadmin') {
      res.status(403);
      throw new Error('Access denied. Super admin access only.');
    }

    // Check if user is active
    if (!user.isActive) {
      res.status(403);
      throw new Error('Account is inactive. Please contact support.');
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

// @description Update full user information
// route        PUT/api/admin/user/:id
// @access      Private/SuperAdmin
const updateUserInfo = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { name, email, contactNumber, role, isActive, schoolId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Update basic info
    if (name !== undefined) {
      user.name = name;
    }
    if (email !== undefined) {
      // Check if email is already taken by another user
      const emailExists = await User.findOne({ email, _id: { $ne: userId } });
      if (emailExists) {
        res.status(400);
        throw new Error('Email already in use');
      }
      user.email = email;
    }
    if (contactNumber !== undefined) {
      user.contactNumber = contactNumber;
    }

    // Update role if provided
    if (role !== undefined) {
      if (['superadmin', 'schooladmin', 'teacher', 'student'].includes(role)) {
        user.role = role;
      } else {
        res.status(400);
        throw new Error('Invalid role');
      }
    }

    // Update status if provided
    if (isActive !== undefined) {
      user.isActive = isActive;
    }

    // Handle school assignment
    if (schoolId !== undefined) {
      if (schoolId === '' || schoolId === null) {
        // Remove school assignment
        user.school = undefined;
        
        // If user was schooladmin, remove admin reference from school
        if (user.role === 'schooladmin') {
          const school = await School.findOne({ adminId: userId });
          if (school) {
            school.adminId = undefined;
            await school.save();
          }
        }
      } else {
        // Assign to school
        const school = await School.findById(schoolId);
        if (!school) {
          res.status(404);
          throw new Error('School not found');
        }
        
        user.school = schoolId;
        
        // If user is schooladmin, update school admin reference
        if (user.role === 'schooladmin') {
          school.adminId = userId;
          await school.save();
        }
      }
    }

    const updatedUser = await user.save();
    const populatedUser = await User.findById(updatedUser._id).populate('school', 'name');

    res.status(200).json({
      _id: populatedUser._id,
      name: populatedUser.name,
      email: populatedUser.email,
      contactNumber: populatedUser.contactNumber,
      role: populatedUser.role,
      isActive: populatedUser.isActive,
      school: populatedUser.school
    });
  } catch (error) {
    console.error("Error updating user info:", error);
    res.status(error.statusCode || 500);
    throw error;
  }
});

export { viewUserList, toggleUserStatusAndRole, authSuperAdmin, updateUserInfo };
