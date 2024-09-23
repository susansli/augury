import express, { Router } from 'express';
export const router: Router = express.Router();

import PortfolioController from '../controllers/auth/PortfolioController';

router.route('/getPortfolio').get(PortfolioController.getPortfolio);
