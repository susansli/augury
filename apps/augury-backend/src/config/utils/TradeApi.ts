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

  public getQuotes(symbol: string[]): Promise<Map<string, AlpacaQuote>> {
    return this.alpaca
      .getLatestQuotes(symbol)
      .then((quotes: Map<string, AlpacaQuote>) => {
        return quotes;
      })
      .catch((err: unknown) => {
        // May potentially 404 when invalid symbol is provided, but DB symbols should already be valid stocks.
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

  public getAllSymbols(): string[] {
    // Type required to extract symbol. Ref: https://docs.alpaca.markets/reference/get-v2-assets-1)
    // For some reason, the Asset type exists within the README.md but not in the type defs
    type Asset = { symbol: string; status: string; tradable: boolean };
    return this.alpaca
      .getAssets()
      .then((assets: Asset[]) => {
        const isValidAsset = (asset: Asset) => {
          return asset.status == 'active' && asset.tradable;
        };
        // Return array of mapped symbol strings
        return assets.filter(isValidAsset).map((asset) => asset.symbol);
      })
      .catch((err: unknown) => {
        throw new ApiError(
          'Unable to retrieve stock symbols',
          StatusCode.INTERNAL_ERROR,
          Severity.MED
        );
      });
  }
}

export default TradeApi;
