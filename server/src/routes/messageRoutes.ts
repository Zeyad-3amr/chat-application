import express from 'express';
import { sendMessage } from '../controllers/messageController';
import { protect } from '../controllers/userController';

export const router = express.Router();

router.route('/sendMessage').post(protect, sendMessage);
