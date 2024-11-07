import ApiError from '../errors/ApiError';
import ClientError from '../errors/ClientError';
import { Request, Response, NextFunction } from 'express';

export default function customErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ApiError) {
    // console.error(err.stack);
    res.status(err.statusCode).send();
  } else if (err instanceof ClientError) {
    res.status(err.statusCode).send();
  }
}
