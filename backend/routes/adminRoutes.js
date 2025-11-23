import express from 'express';
const router = express.Router();
import { viewUserList, toggleUserStatusAndRole, updateUserInfo } from '../controllers/adminController.js';
import { protect, isSuperAdmin } from '../middleware/authMiddleware.js';


router.get('/userlist', protect, isSuperAdmin, viewUserList);
router.put('/userstatus/:id', protect, isSuperAdmin, toggleUserStatusAndRole);
router.put('/user/:id', protect, isSuperAdmin, updateUserInfo);


export default router;