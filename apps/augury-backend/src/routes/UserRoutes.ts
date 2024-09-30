import express, { Router } from 'express';
export const router: Router = express.Router();

import UserController from '../controllers/auth/UserController';

router
  .route('/User')
  .get(UserController.getUser)
  .post(UserController.createUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);
router.route('/User/Balance').put(UserController.updateUserBalance);
