import express, { Router } from 'express';
export const userRouter: Router = express.Router();

import UserController from '../controllers/auth/UserController';
import { verifyTokenAndAttachUser } from '../middlewares/SessionController';

userRouter.use(verifyTokenAndAttachUser);

userRouter
  .route('/')
  .get(UserController.getUser)
  .post(UserController.createUser)
  .put(UserController.updateUser);
// .delete(UserController.deleteUser);
userRouter.route('/Balance').put(UserController.updateUserBalance);
