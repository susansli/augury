import { Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import StatusCode from '../../config/enums/StatusCode';
import Severity from '../../config/enums/Severity';
import Identifiable from '../../config/interfaces/Identifiable';
import { StockRequestBody } from '../../config/interfaces/Stock';
import {
  assertExists,
  assertNumber,
  assertTrue,
} from '../../config/utils/validation';
import StockModel from '../../models/auth/StockModel';
import TradeApi from '../../config/utils/TradeApi';

const buyStock = async (
  req: Request<Identifiable, unknown, StockRequestBody>,
  res: Response
) => {
  const { id: portfolioId } = req.params;
  const { symbol, shares } = req.body;
  // Assert the request format was valid
  assertExists(portfolioId, 'Invalid portfolio ID provided');
  assertExists(symbol, 'Invalid stock symbol provided');
  assertNumber(shares, 'Invalid number provided');
  assertTrue(shares > 0, 'Must buy positive number of shares');
  // Get the current stock price from
  const quoteData = await TradeApi.getInstance().getQuote(symbol);
  const price = quoteData.BidPrice;
  // Create a buy record for the requested stock
  const buyRecord = await StockModel.createBuyRecord(
    portfolioId,
    symbol,
    shares,
    price
  );

  if (!buyRecord) {
    throw new ApiError(
      'Unable to buy this stock',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  res.status(StatusCode.OK).send({ stock: buyRecord });
};

const sellStock = async (
  req: Request<Identifiable, unknown, StockRequestBody>,
  res: Response
) => {
  const { id: portfolioId } = req.params;
  const { symbol, shares } = req.body;
  // Assert the request format was valid
  assertExists(portfolioId, 'Invalid portfolio ID provided');
  assertExists(symbol, 'Invalid stock symbol provided');
  assertNumber(shares, 'Invalid number provided');
  assertTrue(shares > 0, 'Must sell positive number of shares');
  // Check if we actually have that amount of shares to sell
  const totalShares = await StockModel.getTotalShares(portfolioId, symbol);
  assertTrue(
    totalShares >= shares,
    'Cannot sell more shares than currently holding'
  );
  // Get the current stock price from
  const quoteData = await TradeApi.getInstance().getQuote(symbol);
  const price = quoteData.AskPrice;
  // Create a buy record for the requested stock
  const buyRecord = await StockModel.createBuyRecord(
    portfolioId,
    symbol,
    shares * -1, // Multiply by -1 to store as negative shares in records
    price
  );

  if (!buyRecord) {
    throw new ApiError(
      'Unable to sell this stock',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  res.status(StatusCode.OK).send({ stock: buyRecord });
};

export default module.exports = {
  buyStock,
  sellStock,
};
