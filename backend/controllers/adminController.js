import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// GET user profiles
// Activate and deactivate users, Update user role.
const viewUserList = asyncHandler(async (req, res) => {
  try {
    const userList = await User.find({});
    console.log("User List:", userList);
    res.status(201).json(userList);
  } catch (error) {
    console.error("Error fetching user list:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Toggle user isActive status and update user role
const toggleUserStatusAndRole = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { role, isActive } = req.body;

  try {
    const user = await User.findById(userId);

    if (user) {
      if (isActive !== undefined) {
        user.isActive = isActive;
      }

      if (role !== undefined) {
        user.role = role;
      }

      await user.save();

      res.status(200).json({ message: "User status and role updated successfully", user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user status and role:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { viewUserList, toggleUserStatusAndRole };
