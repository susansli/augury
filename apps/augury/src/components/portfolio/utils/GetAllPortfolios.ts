import { SERVER_URL } from '../../../api/Environments';
import axios from 'axios';
interface PortfolioGroup {
  id: string;
  portfolios: string[]; // Array of portfolio IDs
}
/**
 * Fetches all portfolios associated with a user's portfolio groups.
 * @param {string} userId - The ID of the user to fetch portfolios for.
 * @returns {Promise<Array>} - A promise that resolves to an array of portfolios.
 */
async function fetchAllPortfoliosForUser(userId: string): Promise<any[]> {
  try {
    // Fetch portfolio groups for the user
    const groupResponse = await axios.get(
      `${SERVER_URL}/portfolio/group/user/672a6e7501ca4cc969f7ac3b`
    );
    const portfolioGroups: PortfolioGroup[] = groupResponse.data?.groups || []; // Ensure this is an array

    console.log('Portfolio Groups:', portfolioGroups);
    const portfolioIds = portfolioGroups.flatMap((group) => group.portfolios);
    console.log(portfolioIds);

    const portfolioPromises = portfolioGroups.flatMap(
      (group) =>
        group?.portfolios?.map((portfolioId: string) =>
          axios.get(`${SERVER_URL}/portfolio/${portfolioId}`)
        ) || []
    );

    const portfolioResponses = await Promise.all(portfolioPromises);

    const portfolios = portfolioResponses.map(
      (response) => response.data.portfolio
    );

    return portfolios;
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    throw new Error('Could not fetch portfolios');
  }
}

export default fetchAllPortfoliosForUser;
