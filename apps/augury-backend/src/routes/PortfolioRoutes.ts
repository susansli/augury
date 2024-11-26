import express, { Router } from 'express';
// import { verifyAccessToken } from '../middlewares/AttachUserHandler';
import asyncErrorHandler from '../middlewares/AsyncErrorHandler';
import PortfolioDefaultController from '../controllers/auth/PortfolioDefaultController';
import PortfolioGroupController from '../controllers/auth/PortfolioGroupController';
import PortfolioController from '../controllers/auth/PortfolioController';
import StockController from '../controllers/auth/StockController';

const portfolioRouter: Router = express.Router();

// Uncomment if we want to verify the client's auth token for all routes
// userRouter.use(asyncErrorHandler(verifyAccessToken));

// ================ Portfolio Defaults ================
portfolioRouter
  .route('/defaults')
  .post(asyncErrorHandler(PortfolioDefaultController.createPortfolioDefaults));

portfolioRouter
  .route('/defaults/:id')
  .get(asyncErrorHandler(PortfolioDefaultController.getPortfolioDefaults))
  .put(asyncErrorHandler(PortfolioDefaultController.updatePortfolioDefaults))
  .delete(
    asyncErrorHandler(PortfolioDefaultController.deletePortfolioDefaults)
  );

// ================ Portfolio Groups ================
portfolioRouter
  .route('/group')
  .post(asyncErrorHandler(PortfolioGroupController.createPortfolioGroup))
  .put(asyncErrorHandler(PortfolioGroupController.updatePortfolioGroup))
  .delete(asyncErrorHandler(PortfolioGroupController.deletePortfolioGroup));

portfolioRouter
  .route('/group/:id')
  .get(asyncErrorHandler(PortfolioGroupController.getPortfolioGroup))
  .put(asyncErrorHandler(PortfolioGroupController.addPortfoliosToGroup))
  .delete(
    asyncErrorHandler(PortfolioGroupController.removePortfoliosFromGroup)
  );

portfolioRouter
  .route('/group/:id/valuation')
  .get(asyncErrorHandler(StockController.calculatePortfolioGroupValuation));

portfolioRouter
  .route('/group/user/:id')
  .get(asyncErrorHandler(PortfolioGroupController.getPortfolioGroupsByUserId));

// ================ Individual Portfolios ================
portfolioRouter
  .route('/')
  .post(asyncErrorHandler(PortfolioController.createPortfolio));

portfolioRouter
  .route('/:id')
  .get(asyncErrorHandler(PortfolioController.getPortfolio))
  .put(asyncErrorHandler(PortfolioController.updatePortfolio))
  .delete(asyncErrorHandler(PortfolioController.deletePortfolio));

// ================ Portfolio Stocks ================
portfolioRouter
  .route('/buy')
  .post(asyncErrorHandler(StockController.buyStock));

portfolioRouter
  .route('/:id/sell')
  .post(asyncErrorHandler(StockController.sellStock));

portfolioRouter
  .route('/:id/valuation')
  .get(asyncErrorHandler(StockController.calculatePortfolioValuation));

export default portfolioRouter;
