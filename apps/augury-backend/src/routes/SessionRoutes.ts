import express, { Router } from 'express';
export const router: Router = express.Router();

import SessionController from '../controllers/auth/SessionController';

router.route('/getSession').get(SessionController.getSession);
