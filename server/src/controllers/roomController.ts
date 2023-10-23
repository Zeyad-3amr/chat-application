import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';

import { RequestHandler, Request, Response } from 'express';
import { CustomRequest } from '../interfaces/customRequest';
import Room from '../model/Room';

export const roomCheck: RequestHandler = catchAsync(
  async (req: CustomRequest, res: Response, next) => {
    let room;
    let statusCode: number = 200;

    room = await Room.findOne({
      users: { $size: 2, $all: [req.user?.id, req.params.id] },
    }).populate({
      path: 'users',
    });

    if (!room) {
      room = await Room.create({
        users: [req.user?.id, req.params?.id],
      });

      statusCode = 201;
    }
    room = await room.populate({
      path: 'users',
    });
    // room = await room.populate({
    //   path: 'messages',
    //   populate: [
    //     {
    //       path: 'from',
    //     },
    //     {
    //       path: 'to',
    //     },
    //   ],
    // });
    res.status(statusCode).json({
      status: 'success',
      room,
    });
  }
);
