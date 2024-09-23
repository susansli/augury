import express, { Router } from 'express';
export const router: Router = express.Router();

import PortfolioGroupController from '../controllers/auth/PortfolioGroupController';

router
  .route('/getPortfolioGroup')
  .get(PortfolioGroupController.getPortfolioGroup);
