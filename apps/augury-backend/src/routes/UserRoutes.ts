import express, { Router } from 'express';
import UserController from '../controllers/auth/UserController';
// import { verifyAccessToken } from '../middlewares/AttachUserHandler';
import asyncErrorHandler from '../middlewares/AsyncErrorHandler';

const userRouter: Router = express.Router();

// Uncomment if we want to verify the client's auth token for all routes
// userRouter.use(asyncErrorHandler(verifyAccessToken));

userRouter.route('/').post(asyncErrorHandler(UserController.createUser));

userRouter
  .route('/current')
  .get(asyncErrorHandler(UserController.getLoggedInUserData));

userRouter
  .route('/onboard')
  .post(asyncErrorHandler(UserController.onboardNewUser));

userRouter
  .route('/:id')
  .get(asyncErrorHandler(UserController.getUser))
  .put(asyncErrorHandler(UserController.updateUser));
// .delete(asyncErrorHandler(UserController.deleteUser));

userRouter
  .route('/:id/balance')
  .put(asyncErrorHandler(UserController.updateUserBalance));

export default userRouter;
