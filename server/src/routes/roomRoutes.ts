import express from 'express';
import { protect } from '../controllers/userController';
import { roomCheck } from '../controllers/roomController';

export const router = express.Router();

router.route('/roomCheck/:userName').get(protect, roomCheck);
