import express, { Router } from 'express';
export const userRouter: Router = express.Router();

import UserController from '../controllers/auth/UserController';

userRouter
  .route('/User')
  .get(UserController.getUser)
  .post(UserController.createUser)
  .put(UserController.updateUser);
// .delete(UserController.deleteUser);
userRouter.route('/User/Balance').put(UserController.updateUserBalance);
