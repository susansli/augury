import axios from 'axios';
import { CompositionValues } from '../../components/onboarding/OnboardingDefaults';
import { SERVER_URL } from '../Environments';
import AuthStoreManager from '../../helpers/AuthStoreManager';

export interface PortfolioDefaultBody {
  balance: string;
  composition: CompositionValues;
  risk: boolean;
  sectors: string[];
}
async function getValuationofPortfolio(portfolioId: string) {
  try {
    const response = await axios.get(
      `${SERVER_URL}/portfolio/${portfolioId}/valuation`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response) {
      return null;
    }
    console.log(response.data);
    return response.data.totalPriceDifference;
  } catch {
    return null;
  }
}
async function updatePortfolioDefaults(reqBody: PortfolioDefaultBody) {
  try {
    const response = await axios.post(
      `${SERVER_URL}/user/onboard`,
      {
        id: AuthStoreManager.getUserId(),
        balance: Number(reqBody.balance),
        defaults: {
          name: 'default',
          // useCustomRisk: reqBody.risk,
          riskPercentage1: reqBody.composition,
          riskPercentage2: 100 - reqBody.composition,
          sectorTags: reqBody.sectors,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

async function getAiRecommentation(
  portfolioId: string
): Promise<string | null> {
  try {
    const response = await axios.get(
      `${SERVER_URL}/portfolio/${portfolioId}/ai/recommendation`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response) {
      return null;
    }
    return response.data;
  } catch {
    return null;
  }
}

const Portfolio = {
  updatePortfolioDefaults,
  getAiRecommentation,
  getValuationofPortfolio,
};

export default Portfolio;
