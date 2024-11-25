import express, { Router } from 'express';
// import { verifyAccessToken } from '../middlewares/AttachUserHandler';
import asyncErrorHandler from '../middlewares/AsyncErrorHandler';
import StockController from '../controllers/auth/StockController';

const stockRouter: Router = express.Router();

// Uncomment if we want to verify the client's auth token for all routes
// userRouter.use(asyncErrorHandler(verifyAccessToken));

// ================ Stocks ================
stockRouter
  .route('/symbols')
  .get(asyncErrorHandler(StockController.getAllSymbols));

export default stockRouter;
