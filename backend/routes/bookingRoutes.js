import express from 'express';
const router = express.Router();
import { createBookings, viewBookings, cancelBooking, viewSchedule } from '../controllers/bookingController.js';
import { protect, student } from '../middleware/authMiddleware.js';




router.post('/create', protect , student, createBookings);
router.get('/view', protect,  student, viewBookings);
router.get('/schedule', protect, student, viewSchedule)
router.put('/cancel/:id', protect,  student, cancelBooking);


export default router;