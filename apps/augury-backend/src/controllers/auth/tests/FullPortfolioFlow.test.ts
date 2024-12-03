import mongoose from 'mongoose';
import axios from 'axios';
import 'dotenv/config';

const baseURL = 'http://localhost:3333/portfolio'; // Base URL for portfolio routes
let createdGroupId: string;
let createdPortfolioId: string;

beforeAll(async () => {
  // Establish MongoDB connection
  mongoose.connect(`${process.env.MONGO_TEST_URL}`);
});

afterAll(async () => {
  // Disconnect MongoDB after tests
  await mongoose.disconnect();
});

describe('Portfolio System Full Flow Test', () => {
  it('should create a portfolio group, add a portfolio, and calculate valuation', async () => {
    // Step 1: Create a Portfolio Group
    const groupPayload = {
      userId: '672a6e7501ca4cc969f7ac3b',
      name: 'Test Group',
      color: 'blue',
    };

    const createGroupResponse = await axios.post(
      `${baseURL}/group`,
      groupPayload
    );
    expect(createGroupResponse.status).toBe(200);
    expect(createGroupResponse.data.group.name).toBe('Test Group');
    createdGroupId = createGroupResponse.data.group.id; // Save group ID

    // Step 2: Create a Portfolio
    const portfolioPayload = {
      name: 'Test Portfolio',
      riskPercentage1: 60,
      riskPercentage2: 40,
      sectorTags: ['materials', 'energy'],
    };

    const createPortfolioResponse = await axios.post(
      `${baseURL}`,
      portfolioPayload
    );
    expect(createPortfolioResponse.status).toBe(200);
    expect(createPortfolioResponse.data.portfolio.name).toBe('Test Portfolio');
    createdPortfolioId = createPortfolioResponse.data.portfolio.id; // Save portfolio ID

    // Step 3: Add Portfolio to Group
    const addPortfolioPayload = {
      portfolios: [createdPortfolioId],
    };

    const addToGroupResponse = await axios.put(
      `${baseURL}/group/${createdGroupId}`,
      addPortfolioPayload
    );
    expect(addToGroupResponse.status).toBe(200);

    // Step 4: Get Valuation of Portfolio Group
    const getValuationResponse = await axios.get(
      `${baseURL}/group/${createdGroupId}/valuation`
    );
    expect(getValuationResponse.status).toBe(200);
    expect(getValuationResponse.data.totalPriceDifference).toBeDefined(); // Ensure valuation is calculated
  });
});
