import express, { Router } from 'express';
import UserController from '../controllers/auth/UserController';
import { verifyTokenAndAttachUser } from '../middlewares/AttachUserHandler';
import asyncErrorHandler from '../middlewares/AsyncErrorHandler';

export const userRouter: Router = express.Router();
const baseURL = '/user';

userRouter.use(asyncErrorHandler(verifyTokenAndAttachUser));

userRouter
  .route(baseURL)
  .get(asyncErrorHandler(UserController.getUser))
  .post(asyncErrorHandler(UserController.createUser))
  .put(asyncErrorHandler(UserController.updateUser));
// .delete(asyncErrorHandler(UserController.deleteUser));

userRouter
  .route(`${baseURL}/balance`)
  .put(asyncErrorHandler(UserController.updateUserBalance));
