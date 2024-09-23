import express, { Router } from 'express';
export const router: Router = express.Router();

import PortfolioGroupRelationController from '../controllers/auth/PortfolioGroupRelationController';

router
  .route('/getPortfolioGroupRelation')
  .get(PortfolioGroupRelationController.getPortfolioGroupRelation);
