import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import School from "../models/schoolModel.js";

// @description Get school details for a school admin
// route        GET /api/schooladmin/school
// @access      Private/SchoolAdmin
const getSchoolForAdmin = asyncHandler(async (req, res) => {
  // The school admin's school ID is stored in the user record
  const schoolId = req.user.school;
  
  if (!schoolId) {
    res.status(404);
    throw new Error('No school associated with this admin');
  }

  const school = await School.findById(schoolId);
  
  if (school) {
    res.status(200).json(school);
  } else {
    res.status(404);
    throw new Error('School not found');
  }
});

// @description Get teachers for a school
// route        GET /api/schooladmin/teachers
// @access      Private/SchoolAdmin
const getSchoolTeachers = asyncHandler(async (req, res) => {
  const schoolId = req.user.school;

  const teachers = await User.find({
    school: schoolId,
    role: 'teacher'
  }).select('-password');

  res.status(200).json(teachers);
});

// @description Get students for a school
// route        GET /api/schooladmin/students
// @access      Private/SchoolAdmin
const getSchoolStudents = asyncHandler(async (req, res) => {
  const schoolId = req.user.school;

  const students = await User.find({
    school: schoolId,
    role: 'student'
  }).select('-password');

  res.status(200).json(students);
});

// @description Update user information (name, email, contactNumber, role, status)
// route        PUT /api/schooladmin/users/:id
// @access      Private/SchoolAdmin
const updateSchoolUser = asyncHandler(async (req, res) => {
  const { name, email, contactNumber, role, isActive } = req.body;
  const userId = req.params.id;
  const schoolId = req.user.school;

  // Find the user and ensure they belong to this school admin's school
  const user = await User.findOne({ 
    _id: userId,
    school: schoolId 
  });

  if (!user) {
    res.status(404);
    throw new Error('User not found or not associated with your school');
  }

  // Ensure school admins can only manage teachers and students
  if (user.role !== 'teacher' && user.role !== 'student') {
    res.status(403);
    throw new Error('You can only manage teachers and students');
  }

  // Update user info
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

  // Update role (only teacher or student)
  if (role && (role === 'teacher' || role === 'student')) {
    user.role = role;
  }

  if (isActive !== undefined) {
    user.isActive = isActive;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    contactNumber: updatedUser.contactNumber,
    role: updatedUser.role,
    isActive: updatedUser.isActive
  });
});

// @description Add a user to the school
// route        POST /api/schooladmin/users
// @access      Private/SchoolAdmin
const addUserToSchool = asyncHandler(async (req, res) => {
  const { email, role } = req.body;
  const schoolId = req.user.school;

  // Check if user exists
  const user = await User.findOne({ email });

  if (user) {
    // User exists, update their school and role
    // Only if they're not already assigned to a school or are in the current school
    if (user.school && !user.school.equals(schoolId)) {
      res.status(400);
      throw new Error('User is already associated with another school');
    }

    user.school = schoolId;
    
    // Only allow assigning teacher or student roles
    if (role === 'teacher' || role === 'student') {
      user.role = role;
    } else {
      res.status(400);
      throw new Error('Invalid role assignment');
    }

    const updatedUser = await user.save();
    
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      message: 'User successfully added to school'
    });
  } else {
    res.status(404);
    throw new Error('User not found. They must register first.');
  }
});

export { 
  getSchoolForAdmin,
  getSchoolTeachers,
  getSchoolStudents,
  updateSchoolUser,
  addUserToSchool
}; 