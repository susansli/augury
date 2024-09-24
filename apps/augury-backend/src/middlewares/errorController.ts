import ApiError from '../errors/ApiError';
import ClientError from '../errors/ClientError';
import { Response, Request } from 'express';

export function errorController(err: Error, req: Request, res: Response) {
  if (err instanceof ApiError) {
    console.error(err.stack);
    res.send(err.statusCode);
  } else if (err instanceof ClientError) {
    res.send(err.statusCode);
  }
}
