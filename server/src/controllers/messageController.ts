import { RequestHandler } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { CustomRequest } from '../interfaces/customRequest';
import { MessageBody } from '../interfaces/messageController';
import Message from '../model/Message';

export const sendMessage: RequestHandler = catchAsync(
  async (req: CustomRequest<MessageBody>, res, next) => {
    const message = await Message.create({
      text: req.body.text,
    });
    console.log(req.user);

    console.log(message);
    res.status(200).json({
      status: 'success',
      data: message,
    });
  }
);
