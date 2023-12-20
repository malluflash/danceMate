import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import slotsRoutes from './routes/slotsRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';



connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/slots', slotsRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req,res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server is running on port ${port}`));




