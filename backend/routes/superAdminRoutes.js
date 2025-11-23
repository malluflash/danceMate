import express from 'express';
const router = express.Router();
import { authSuperAdmin } from '../controllers/adminController.js';

// Super admin authentication route (separate from regular login)
router.post('/auth', authSuperAdmin);

export default router;

