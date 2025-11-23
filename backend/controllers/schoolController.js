import asyncHandler from "express-async-handler";
import School from "../models/schoolModel.js";
import User from "../models/userModel.js";

// @description Create a new school
// route        POST /api/schools
// @access      Private/SuperAdmin
const createSchool = asyncHandler(async (req, res) => {
  const { name, address, city, contactNumber, email, description } = req.body;

  // Check if school with same email already exists
  const schoolExists = await School.findOne({ email });
  if (schoolExists) {
    res.status(400);
    throw new Error('School with this email already exists');
  }

  const school = await School.create({
    name,
    address,
    city,
    contactNumber,
    email,
    description,
    isActive: true
  });

  if (school) {
    res.status(201).json(school);
  } else {
    res.status(400);
    throw new Error('Invalid school data');
  }
});

// @description Get all schools
// route        GET /api/schools
// @access      Private/SuperAdmin
const getSchools = asyncHandler(async (req, res) => {
  const schools = await School.find({}).populate('adminId', 'name email');
  res.status(200).json(schools);
});

// @description Get active schools (public)
// route        GET /api/schools/public
// @access      Public
const getActiveSchools = asyncHandler(async (req, res) => {
  const schools = await School.find({ isActive: true })
    .select('name address city contactNumber email description')
    .limit(20); // Limit to 20 for homepage
  res.status(200).json(schools);
});

// @description Get school by ID
// route        GET /api/schools/:id
// @access      Private/SuperAdmin/SchoolAdmin
const getSchoolById = asyncHandler(async (req, res) => {
  const school = await School.findById(req.params.id).populate('adminId', 'name email');
  
  if (school) {
    res.status(200).json(school);
  } else {
    res.status(404);
    throw new Error('School not found');
  }
});

// @description Update school
// route        PUT /api/schools/:id
// @access      Private/SuperAdmin/SchoolAdmin
const updateSchool = asyncHandler(async (req, res) => {
  const school = await School.findById(req.params.id);
  
  if (school) {
    school.name = req.body.name || school.name;
    school.address = req.body.address || school.address;
    school.city = req.body.city || school.city;
    school.contactNumber = req.body.contactNumber || school.contactNumber;
    school.email = req.body.email || school.email;
    school.description = req.body.description || school.description;
    
    if (req.body.isActive !== undefined) {
      school.isActive = req.body.isActive;
    }

    const updatedSchool = await school.save();
    res.status(200).json(updatedSchool);
  } else {
    res.status(404);
    throw new Error('School not found');
  }
});

// @description Assign admin to school
// route        PUT /api/schools/:id/assign-admin
// @access      Private/SuperAdmin
const assignSchoolAdmin = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const school = await School.findById(req.params.id);
  
  if (!school) {
    res.status(404);
    throw new Error('School not found');
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Update user to be school admin
  user.role = 'schooladmin';
  user.school = school._id;
  user.isActive = true;
  await user.save();

  // Update school with admin reference
  school.adminId = user._id;
  await school.save();

  res.status(200).json({ message: 'School admin assigned successfully', school, user });
});

// @description Get teachers and students for a school
// route        GET /api/schools/:id/users
// @access      Private/SuperAdmin/SchoolAdmin
const getSchoolUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ 
    school: req.params.id,
    role: { $in: ['teacher', 'student'] }
  }).select('-password');
  
  res.status(200).json(users);
});

export { 
  createSchool, 
  getSchools, 
  getActiveSchools,
  getSchoolById, 
  updateSchool, 
  assignSchoolAdmin,
  getSchoolUsers
}; 