import express, { Router } from 'express';
export const router: Router = express.Router();

import PortfolioGroupController from '../controllers/auth/PortfolioGroupController';

router
  .route('/portfolioGroup')
  .get(PortfolioGroupController.getPortfolioGroup)
  .post(PortfolioGroupController.createPortfolioGroup)
  .put(PortfolioGroupController.updatePortfolioGroup)
  .delete(PortfolioGroupController.deletePorfolioGroup);
