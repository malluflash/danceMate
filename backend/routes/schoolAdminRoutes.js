import express from 'express';
import { 
  getSchoolForAdmin,
  getSchoolTeachers,
  getSchoolStudents,
  updateSchoolUser,
  addUserToSchool
} from '../controllers/schoolAdminController.js';
import { protect, isSchoolAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes for school admins
router.get('/school', protect, isSchoolAdmin, getSchoolForAdmin);
router.get('/teachers', protect, isSchoolAdmin, getSchoolTeachers);
router.get('/students', protect, isSchoolAdmin, getSchoolStudents);
router.put('/users/:id', protect, isSchoolAdmin, updateSchoolUser);
router.post('/users', protect, isSchoolAdmin, addUserToSchool);

export default router; 