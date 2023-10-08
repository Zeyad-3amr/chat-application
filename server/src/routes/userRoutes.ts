import express from 'express';
import { signup } from '../controllers/userController';

export const router = express.Router();

router.route('/signup').post(signup);
