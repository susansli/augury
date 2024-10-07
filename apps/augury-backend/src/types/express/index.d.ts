import User from '../../config/interfaces/User';

declare global {
  namespace Express {
    interface Request {
      user?: HydratedDocument<User>;
    }
  }
}
