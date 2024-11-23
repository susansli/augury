import Alpaca from '@alpacahq/alpaca-trade-api';
import { AlpacaQuote } from '@alpacahq/alpaca-trade-api/dist/resources/datav2/entityv2';
import ClientError from '../../errors/ClientError';
import StatusCode from '../enums/StatusCode';
import ApiError from '../../errors/ApiError';
import Severity from '../enums/Severity';

class TradeApi {
  static instance: TradeApi;
  private alpaca: Alpaca;

  private constructor() {
    this.alpaca = new Alpaca({
      keyId: process.env.ALPACA_KEY_ID,
      secretKey: process.env.ALPACA_SECRET,
      paper: true,
    });
  }

  public static getInstance() {
    if (!TradeApi.instance) {
      TradeApi.instance = new TradeApi();
    }
    return TradeApi.instance;
  }

  public getQuote(symbol: string): Promise<AlpacaQuote> {
    return this.alpaca
      .getLatestQuote(symbol)
      .then((quote: AlpacaQuote) => {
        return quote;
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.message.startsWith('code: 404')) {
          throw new ClientError(
            'Invalid Stock symbol provided',
            StatusCode.BAD_REQUEST
          );
        } else {
          throw new ApiError(
            'Unable to retrieve stock quote',
            StatusCode.INTERNAL_ERROR,
            Severity.MED
          );
        }
      });
  }
}

export default TradeApi;
