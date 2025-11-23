import express from 'express';
import { 
  createSchool,
  getSchools,
  getActiveSchools,
  getSchoolById, 
  updateSchool,
  assignSchoolAdmin,
  getSchoolUsers
} from '../controllers/schoolController.js';
import { protect, isSuperAdmin, isSchoolAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route for active schools (for homepage)
router.route('/public')
  .get(getActiveSchools);

// Super admin only routes
router.route('/')
  .post(protect, isSuperAdmin, createSchool)
  .get(protect, isSuperAdmin, getSchools);

// School assignment route
router.route('/:id/assign-admin')
  .put(protect, isSuperAdmin, assignSchoolAdmin);

// School-specific routes
router.route('/:id')
  .get(protect, getSchoolById)
  .put(protect, updateSchool);

// School users route
router.route('/:id/users')
  .get(protect, getSchoolUsers);

export default router; 