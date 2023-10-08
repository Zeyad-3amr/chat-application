import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import { Response, NextFunction, RequestHandler } from 'express';
import { CustomRequest } from '../interfaces/customRequest';
import User from '../model/User';
import { SignupBody } from '../interfaces/userController';

export const signup: RequestHandler = catchAsync(
  async (req: CustomRequest<SignupBody>, res, next) => {
    const newUser: {} = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });
    console.log(newUser);
    res.status(201).json({
      status: 'success',
      data: newUser,
    });
  }
);
