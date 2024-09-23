import express, { Router } from 'express';
export const router: Router = express.Router();

import StockController from '../controllers/auth/StockController';

router.route('/getStock').get(StockController.getStock);
