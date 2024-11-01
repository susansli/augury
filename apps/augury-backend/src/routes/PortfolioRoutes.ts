import express, { Router } from 'express';
// import { verifyAccessToken } from '../middlewares/AttachUserHandler';
import asyncErrorHandler from '../middlewares/AsyncErrorHandler';
import PortfolioDefaultController from '../controllers/auth/PortfolioDefaultController';

const portfolioRouter: Router = express.Router();

// Uncomment if we want to verify the client's auth token for all routes
// userRouter.use(asyncErrorHandler(verifyAccessToken));

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
export default portfolioRouter;
