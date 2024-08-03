// src/server.ts

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Db Connection
import connectDB from './utils/db';

// Routes
import auth from './routes/auth';
import admin from './routes/admin';
import merchant from './routes/merchant';
import book from './routes/book';
import client from './routes/client';
import { getUsers, getMerchants, getProducts } from './controller/admin';
import { errorHandler } from './middleware/errorHandler';
import { authorize } from './middleware/authorize';
import { authenticate, authenticateProvider } from './middleware/authenticate';
import { authenticateMerchant } from './middleware/authenticateMerchant';

const app = express();

// PORT
const PORT = process.env.PORT || 5000;

// middleware
app.use(
    cors({
        origin: '*',
        credentials: true,
    })
);
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Routes
app.get('/api/admin/getUsers', getUsers);
app.get('/api/admin/getMerchants', getMerchants);
app.get('/api/admin/getProducts', getProducts);
app.use('/api/auth', authorize, auth);
app.use('/api/merchant', authenticateProvider, authenticateMerchant, merchant);
app.use('/api/admin', authorize, admin);
app.use('/api/client', authenticate, client);
app.use('/api/bookings', authorize, book);

// Error handler
app.use(errorHandler);

// Connect to Database and Start Server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Listening on Port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    });