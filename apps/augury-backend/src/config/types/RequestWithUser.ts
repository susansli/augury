import { HydratedDocument } from 'mongoose';
import { Request } from 'express';
import User from '../interfaces/User';

type RequestWithUser<T = unknown, G = unknown> = Request<T, G> & {
  user?: HydratedDocument<User>;
};

export default RequestWithUser;
