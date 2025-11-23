import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Protect routes
const protect = async (req, res, next) => {
  let token;

  // read the jwt from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

// Teacher middleware (School admin and super admin will also have access)
const teacherOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === "teacher" || req.user.role === "schooladmin" || req.user.role === "superadmin")) {
    next();
  } else {
    res.status(403); // Forbidden
    throw new Error("Not authorized as a teacher or admin");
  }
};

// Student middleware
const student = (req, res, next) => {
  if (req.user && req.user.role === "student") {
    next();
  } else {
    res.status(403); // Forbidden
    throw new Error("Not authorized as a student");
  }
};

// Legacy admin middleware (for backward compatibility)
const admin = (req, res, next) => {
  if (req.user && (req.user.role === "superadmin" || req.user.role === "schooladmin")) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};

// Super admin middleware
const isSuperAdmin = (req, res, next) => {
  if (req.user && req.user.role === "superadmin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as super admin");
  }
};

// School admin middleware
const isSchoolAdmin = (req, res, next) => {
  if (req.user && (req.user.role === "schooladmin" || req.user.role === "superadmin")) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as school admin");
  }
};

export { protect, teacherOrAdmin, student, admin, isSuperAdmin, isSchoolAdmin };
