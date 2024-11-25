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
import {
  StockValuation,
  ValuationResult,
} from '../../config/interfaces/Valuation';
import UserModel from '../../models/auth/UserModel';
import HuggingFaceInferenceApi from '../../config/ai/HuggingFaceInferenceApi';

const alpaca = TradeApi.getInstance();
const huggingface = HuggingFaceInferenceApi.getInstance();

const buyStock = async (
  req: Request<Identifiable, unknown, StockRequestBody>,
  res: Response
) => {
  const { id: portfolioId } = req.params;
  const { symbol, shares, userId } = req.body;
  // Assert the request format was valid
  assertExists(portfolioId, 'Invalid portfolio ID provided');
  assertExists(symbol, 'Invalid stock symbol provided');
  assertNumber(shares, 'Invalid number provided');
  assertTrue(shares > 0, 'Must buy positive number of shares');
  // Get the current stock price from
  const quoteData = await alpaca.getQuote(symbol);
  const price = quoteData.BidPrice;
  // Check if user has the balance for this purchase
  const user = await UserModel.getUser(userId);
  assertTrue(
    user.balance >= price * shares,
    'User must have more funds to purchase this stock'
  );
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

  // Remove balance to the users account
  user.balance -= shares * price;
  await user.save();

  res.status(StatusCode.OK).send({ stock: buyRecord });
};

const sellStock = async (
  req: Request<Identifiable, unknown, StockRequestBody>,
  res: Response
) => {
  const { id: portfolioId } = req.params;
  const { symbol, shares, userId } = req.body;
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
  const quoteData = await alpaca.getQuote(symbol);
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

  // Add balance to the users account
  const user = await UserModel.getUser(userId);
  user.balance += shares * price;
  await user.save();

  res.status(StatusCode.OK).send({ stock: buyRecord });
};

/**
 * Gets the total price difference for a portfolios valuation as well as all the
 * price differences for each stock symbol within a portfolio.
 * @param req Incoming request with ID url parameter
 * @param res Response with `totalPriceDifference` and the `symbolPriceDifferences`
 * @throws `ApiError` if portfolio could not be valuated
 */
const calculatePortfolioValuation = async (
  req: Request<Identifiable>,
  res: Response
) => {
  const { id: portfolioId } = req.params;
  // Assert the request format was valid
  assertExists(portfolioId, 'Invalid portfolio ID provided');
  // Get portfolios valuation
  const valuation = await StockModel.calculatePortfolioValuation(portfolioId);
  if (!valuation) {
    throw new ApiError(
      'Could not valuate this portfolio',
      StatusCode.BAD_REQUEST,
      Severity.MED
    );
  }
  // Call helper function
  const { totalPriceDifference, symbolPriceDifferences } =
    await _calculatePortfolioValuation(valuation);

  res
    .status(StatusCode.OK)
    .send({ totalPriceDifference, symbolPriceDifferences });
};

/**
 * Gets the total price difference for a portfolios valuation as well as all the
 * price differences for each stock symbol within a portfolio.
 * @param req Incoming request with ID url parameter
 * @param res Response with `totalPriceDifference` and each portfolio's id & their `totalPriceDifference`
 * @throws `ApiError` if portfolio group could not be valuated
 */
const calculatePortfolioGroupValuation = async (
  req: Request<Identifiable>,
  res: Response
) => {
  const { id: portfolioGroupId } = req.params;
  // Assert the request format was valid
  assertExists(portfolioGroupId, 'Invalid portfolio group ID provided');
  // Get portfolios valuation
  const valuations = await StockModel.calculatePortfolioGroupValuation(
    portfolioGroupId
  );
  if (!valuations) {
    throw new ApiError(
      'Could not valuate this portfolio group',
      StatusCode.BAD_REQUEST,
      Severity.MED
    );
  }

  const promises = valuations.map(async (valuation) => {
    const { totalPriceDifference } = await _calculatePortfolioValuation(
      valuation
    );
    return {
      portfolioId: valuation._id,
      totalPriceDifference,
    };
  });
  // Await all valuation calls
  const portfolioPriceDifferences = await Promise.all(promises);
  const totalPriceDifference = portfolioPriceDifferences.reduce(
    (total, currentPriceDiff) => {
      return total + currentPriceDiff.totalPriceDifference;
    },
    0
  );

  res
    .status(StatusCode.OK)
    .send({ totalPriceDifference, portfolioPriceDifferences });
};

/**
 * Helper function that calculates the actual current valuation of a portfolio
 * @param valuation Result from Alpaca
 * @returns Object with total price difference values and stock symbol price differences
 */
const _calculatePortfolioValuation = async (valuation: ValuationResult) => {
  // Reduce valuation to get all symbols
  const symbols: string[] = valuation.stocks.map(
    (stock: StockValuation) => stock.symbol
  );
  // Call Alpaca API with symbols
  const quotes = await alpaca.getQuotes(symbols);
  // Calculate based on remaining shares in valuation the current price
  const symbolPriceDifferences = valuation.stocks.map(
    (stock: StockValuation) => {
      // Get current asking bid price and multiply by the total shares currently held
      const currentShareValue =
        quotes.get(stock.symbol).BidPrice * stock.totalShares;
      return {
        symbol: stock.symbol,
        priceDifference: currentShareValue - stock.totalValue, // Total Value already accounts for sold stock
      };
    }
  );
  // Calculate the total price difference of all stocks within this portfolio
  const totalPriceDifference = symbolPriceDifferences.reduce(
    (total: number, symbolPrice) => {
      const { priceDifference } = symbolPrice;
      return total + priceDifference;
    },
    0
  );
  // Return price values
  return { totalPriceDifference, symbolPriceDifferences };
};

const getPortfolioRecommendation = async (
  req: Request<Identifiable>,
  res: Response
) => {
  const { id: portfolioId } = req.params;
  // Assert the request format was valid
  assertExists(portfolioId, 'Invalid portfolio ID provided');
  // Get portfolios valuation
  const valuation = await StockModel.calculatePortfolioValuation(portfolioId);
  if (!valuation) {
    throw new ApiError(
      'Could not valuate this portfolio',
      StatusCode.BAD_REQUEST,
      Severity.MED
    );
  }
  // Call helper function
  const { totalPriceDifference, symbolPriceDifferences } =
    await _calculatePortfolioValuation(valuation);

  // Sort stock symbols to get top performing
  const numTopStocks = 5;
  const topStockSymbols = symbolPriceDifferences
    .sort((stockA, stockB) => stockA.priceDifference - stockB.priceDifference)
    .slice(0, numTopStocks)
    .map((stock) => stock.symbol);

  // Generate a response
  const output = await huggingface.generateResponse(
    `These are the current top performing stock options: ${topStockSymbols}. This portfolio is evaluated at ${totalPriceDifference}. Please recommend some ways or general advice on how to utilize these options! Please keep it to a maximum of three recommendations.`
  );

  // console.log('Output: ' + output);
  res.status(StatusCode.OK).send(output);
};

export default module.exports = {
  buyStock,
  sellStock,
  calculatePortfolioValuation,
  calculatePortfolioGroupValuation,
  getPortfolioRecommendation,
};
