import express from 'express';
const router = express.Router();
import { viewUserList, toggleUserStatusAndRole } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';


router.get('/userlist', protect,  admin, viewUserList);
router.put('/userstatus/:id', protect,  admin, toggleUserStatusAndRole)


export default router;