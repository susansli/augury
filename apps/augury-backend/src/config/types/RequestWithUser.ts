import { HydratedDocument } from 'mongoose';
import { Request } from 'express';
import User from './User';

type RequestWithUser<T = unknown, G = unknown> = Request<T, G> & {
  user?: HydratedDocument<User>;
};

export default RequestWithUser;
