import express from 'express';
import { login, protect, signup } from '../controllers/userController';

export const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(protect, login);
