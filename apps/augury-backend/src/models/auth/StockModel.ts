import ApiError from '../../errors/ApiError';
import StatusCode from '../../config/enums/StatusCode';
import Severity from '../../config/enums/Severity';
import DocumentId from '../../config/interfaces/DocumentId';
import SchemaErrorHandler from '../../middlewares/SchemaErrorHandler';
import StockSchema from '../../config/schemas/StockSchema';
import Stock from '../../config/interfaces/Stock';
import BuyRecordSchema from '../../config/schemas/BuyRecordSchema';
import BuyRecord from '../../config/interfaces/BuyRecord';

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

export default module.exports = {
  createBuyRecord,
};
