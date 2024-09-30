import express, { Router } from 'express';
export const router: Router = express.Router();

import UserController from '../controllers/auth/UserController';

router.route('/getUser').get(UserController.getUser);
router.route('/createUser').post(UserController.createUser);
router.route('/updateUser').put(UserController.updateUser);
router.route('/updateUserBalance').put(UserController.updateUserBalance);
router.route('/deleteUser').delete(UserController.deleteUser);
