import express, {Router} from "express";
export const router: Router = express.Router();

import UserController from "../controllers/auth/UserController";

router.route('/getUser').get(UserController.getUser);