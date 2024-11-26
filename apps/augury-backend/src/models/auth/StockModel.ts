import ApiError from '../../errors/ApiError';
import StatusCode from '../../config/enums/StatusCode';
import Severity from '../../config/enums/Severity';
import DocumentId from '../../config/interfaces/DocumentId';
import SchemaErrorHandler from '../../middlewares/SchemaErrorHandler';
import StockSchema from '../../config/schemas/StockSchema';
import Stock from '../../config/interfaces/Stock';
import BuyRecordSchema from '../../config/schemas/BuyRecordSchema';
import BuyRecord from '../../config/interfaces/BuyRecord';
import { ValuationResult } from '../../config/interfaces/Valuation';
import PortfolioGroupModel from './PortfolioGroupModel';

/**
 * Creates a buy record (purchases/sells a stock) for a portfolio
 * @param portfolioId Mongoose document id of the associated portfolio
 * @param symbol String ticker symbol of the stock to buy
 * @param shares Float amount of shares purchased/sold (Positive or negative)
 * @param price Float current price of stock. Used for later portfolio evaluation
 * @returns a `BuyRecord` document
 * @throws `ApiError` if the stock could not be purchased
 */
const createBuyRecord = async (
  portfolioId: DocumentId,
  symbol: string,
  shares: number,
  price: number
) => {
  // Get stock ID from portfolio ID
  const stock: Stock = {
    portfolioId,
    symbol,
  };
  let stockEntry = await SchemaErrorHandler(StockSchema.findOne(stock));
  if (!stockEntry) {
    // Entry doesn't exist for this portfolio, create new stock entry
    stockEntry = await SchemaErrorHandler(StockSchema.create(stock));
  }

  // Create buy record from stock ID and passed arguments
  const buyRecord: BuyRecord = {
    stockId: stockEntry._id,
    shares, // Shares may be +/-
    boughtAtPrice: price,
  };
  const buyRecordEntry = await SchemaErrorHandler(
    BuyRecordSchema.create(buyRecord)
  );

  if (!buyRecordEntry) {
    throw new ApiError(
      `Unable to ${shares > 0 ? 'buy' : 'sell'} stock`,
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }

  return buyRecordEntry;
};

const getTotalShares = async (portfolioId: DocumentId, symbol: string) => {
  // Get stock ID from portfolio ID
  const stock: Stock = {
    portfolioId,
    symbol,
  };
  const stockEntry = await SchemaErrorHandler(StockSchema.findOne(stock));
  if (!stockEntry) {
    throw new ApiError(
      'Could not find stock for this portfolio',
      StatusCode.INTERNAL_ERROR,
      Severity.MED
    );
  }
  // Get all buyRecords and aggregate total current shares
  const searchRecord: Partial<BuyRecord> = {
    stockId: stockEntry._id,
  };
  const buyRecords = await SchemaErrorHandler(
    BuyRecordSchema.find(searchRecord)
  );

  const totalShares = buyRecords.reduce((previous, record) => {
    return previous + record.shares;
  }, 0);

  return totalShares;
};

const calculateAllPortfolioValuations = async () => {
  const valuations: ValuationResult[] = await StockSchema.aggregate([
    {
      $lookup: {
        from: 'buyrecords',
        localField: '_id',
        foreignField: 'stockId',
        as: 'buyrecords',
      },
    },
    {
      $unwind: '$buyrecords',
    },
    {
      $group: {
        _id: '$_id',
        symbol: {
          $first: '$symbol',
        },
        portfolioId: {
          $first: '$portfolioId',
        },
        totalValue: {
          $sum: {
            $multiply: ['$buyrecords.shares', '$buyrecords.boughtAtPrice'],
          },
        },
        totalShares: {
          $sum: '$buyrecords.shares',
        },
      },
    },
    {
      $group: {
        _id: '$portfolioId',
        stocks: {
          $push: {
            symbol: '$symbol',
            totalValue: '$totalValue',
            totalShares: '$totalShares',
          },
        },
      },
    },
  ]).exec();

  if (valuations == null || valuations == undefined) {
    throw new ApiError(
      'Something went wrong during aggregation',
      StatusCode.INTERNAL_ERROR,
      Severity.HIGH
    );
  }

  return valuations;
};

const calculatePortfolioValuation = async (portfolioId: DocumentId) => {
  // ! Warning: Potentially inefficient call
  const valuations = await calculateAllPortfolioValuations();
  return valuations.find((result: ValuationResult) => {
    return result._id == portfolioId;
  });
};

const calculatePortfolioGroupValuation = async (id: DocumentId) => {
  const { portfolios } = await PortfolioGroupModel.getPortfolioGroup(id);
  const valuations = await calculateAllPortfolioValuations();
  const filteredValuations = valuations.filter((result: ValuationResult) => {
    return portfolios.some((portfolioId: string) => {
      return portfolioId == result._id.toString();
    });
  });
  return filteredValuations;
};

export default module.exports = {
  createBuyRecord,
  getTotalShares,
  calculateAllPortfolioValuations,
  calculatePortfolioValuation,
  calculatePortfolioGroupValuation,
};
