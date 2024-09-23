import express, { Router } from 'express';
export const router: Router = express.Router();

import BuyRecordController from '../controllers/auth/BuyRecordController';

router.route('/getBuyRecord').get(BuyRecordController.getBuyRecord);
