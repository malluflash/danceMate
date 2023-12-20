import express from 'express';
const router = express.Router();
import {
    createSlots, viewSlots, editSlots, cancelSlots, viewSlotById
} from '../controllers/slotsController.js';
import { protect, teacherOrAdmin } from '../middleware/authMiddleware.js';



router.post('/create', protect, teacherOrAdmin, createSlots);
router.get('/view', protect, teacherOrAdmin, viewSlots);
router.get('/view/:id', protect, teacherOrAdmin, viewSlotById);
router.put('/edit/:id', protect, teacherOrAdmin, editSlots);
router.put('/cancel/:id', protect, teacherOrAdmin, cancelSlots)




export default router;