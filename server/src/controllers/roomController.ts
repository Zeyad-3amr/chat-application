import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';

import { RequestHandler, Request, Response } from 'express';
import { CustomRequest } from '../interfaces/customRequest';
import Room from '../model/Room';

export const roomCheck: RequestHandler = catchAsync(
  async (req: CustomRequest, res: Response, next) => {
    let room;
    console.log(req.user?.id);
    let statusCode: number = 200;

    room = await Room.findOne({ users: [req.user?.id, req.params.id] });

    if (!room) {
      room = await Room.create({
        users: [req.user?.id, req.params.id],
      });
      statusCode = 201;
    }

    res.status(statusCode).json({
      status: 'success',
      room,
    });
  }
);
