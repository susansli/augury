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

const alpaca = TradeApi.getInstance();

const buyStock = async (
  req: Request<Identifiable, unknown, StockRequestBody>,
  res: Response
) => {
  const { portfolioId, symbol, shares, userId } = req.body;

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
      'Could not valuate this portfolio',
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
        totalShares: stock.totalShares,
        currentStockValue: currentShareValue,
        percentageChange:
          ((currentShareValue - stock.totalValue) / stock.totalValue) * 100,
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

/**
 * Retrieves all stock symbols from Alpaca
 * @param req Incoming request
 * @param res Object with array of stock symbols
 */
const getAllSymbols = async (_req: Request, res: Response) => {
  // Possibly cache/memoize this in future\

  const symbols = (await alpaca.getAllSymbols())
  .sort((a, b) => a.localeCompare(b))
  .slice(0, 200);

  const truncatedSymbols = [];

  for (const symbol of symbols) {
    try {
      const quoteData = await alpaca.getQuote(symbol);

      // possibly getting rate limited
      const delay = () => new Promise((resolve) => setTimeout(resolve, 100));
      delay().then();

      if (quoteData.AskPrice > 0) {
        truncatedSymbols.push({ symbol: symbol, price: quoteData.AskPrice });
      }
    } catch {
      // some symbols are apparently invalid; just catch them
    }
  }

  res.status(StatusCode.OK).send({ symbols: truncatedSymbols });
};

export default module.exports = {
  buyStock,
  sellStock,
  calculatePortfolioValuation,
  calculatePortfolioGroupValuation,
  getAllSymbols,
};
