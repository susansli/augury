import express, { Router } from 'express';
import UserController from '../controllers/auth/UserController';
// import { verifyAccessToken } from '../middlewares/AttachUserHandler';
import asyncErrorHandler from '../middlewares/AsyncErrorHandler';

const userRouter: Router = express.Router();
const baseURL = '/user';

// Uncomment if we want to verify the client's auth token for all routes
// Don't forget to remove redundant calls from routes below as well.
// userRouter.use(asyncErrorHandler(verifyAccessToken));

userRouter
  .route(baseURL)
  .get(asyncErrorHandler(UserController.getUser))
  .post(asyncErrorHandler(UserController.createUser))
  .put(asyncErrorHandler(UserController.updateUser));
// .delete(asyncErrorHandler(UserController.deleteUser));

userRouter
  .route(`${baseURL}/balance`)
  .put(asyncErrorHandler(UserController.updateUserBalance));

userRouter
  .route(`${baseURL}/current`)
  .get(asyncErrorHandler(UserController.getLoggedInUserData));

export default userRouter;
