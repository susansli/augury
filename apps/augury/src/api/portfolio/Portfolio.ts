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

const Portfolio = {
  updatePortfolioDefaults,
};

export default Portfolio;
