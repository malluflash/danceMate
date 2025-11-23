import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/userModel.js';
import mongoose from 'mongoose';

dotenv.config();

const createSuperAdmin = async () => {
  try {
    // Connect to database
    await connectDB();

    const email = process.argv[2] || 'superadmin@dancemate.com';
    const password = process.argv[3] || 'admin123';
    const name = process.argv[4] || 'Super Admin';
    const contactNumber = process.argv[5] || '1234567890';

    // Check if superadmin already exists
    const existingSuperAdmin = await User.findOne({ role: 'superadmin' });
    if (existingSuperAdmin) {
      console.log('Super admin already exists!');
      console.log(`Email: ${existingSuperAdmin.email}`);
      console.log('You can update an existing user to superadmin instead.');
      process.exit(0);
    }

    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`User with email ${email} already exists.`);
      console.log('Updating role to superadmin...');
      existingUser.role = 'superadmin';
      existingUser.isActive = true;
      existingUser.school = undefined; // Superadmin doesn't need a school
      await existingUser.save();
      console.log('✅ User updated to superadmin successfully!');
      console.log(`Email: ${email}`);
      process.exit(0);
    }

    // Create new superadmin user
    const superAdmin = await User.create({
      name,
      email,
      password,
      contactNumber: parseInt(contactNumber),
      role: 'superadmin',
      isActive: true
    });

    console.log('✅ Super admin created successfully!');
    console.log(`Name: ${superAdmin.name}`);
    console.log(`Email: ${superAdmin.email}`);
    console.log(`Password: ${password}`);
    console.log('\nYou can now login with these credentials.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating super admin:', error.message);
    process.exit(1);
  }
};

createSuperAdmin();

