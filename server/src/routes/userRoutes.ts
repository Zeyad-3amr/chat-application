import express from 'express';
import { getAllUsers, login, protect, signup } from '../controllers/userController';

export const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/getAllUsers').get(protect, getAllUsers);
