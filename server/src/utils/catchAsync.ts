// import { RequestHandler } from 'express';

// import { RequestHandler } from 'express';

// export const catchAsync = (fn: RequestHandler): RequestHandler => {
//   return (req, res, next) => {
//     fn(req, res, next).catch(next);
//   };
// };

import { RequestHandler } from 'express';

export const catchAsync = (fn: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
