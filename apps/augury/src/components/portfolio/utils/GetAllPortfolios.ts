import { SERVER_URL } from '../../../api/Environments';
import axios from 'axios';

export async function fetchPortfolioIdsByGroupId(
  groupId: string
): Promise<string[]> {
  try {
    const response = await axios.get(
      `${SERVER_URL}/portfolio/group/${groupId}`
    );
    console.log(response.data);
    const { portfolios } = response.data;
    return portfolios || [];
  } catch (error) {
    console.error('Error fetching portfolio IDs:', error);
    throw new Error('Could not fetch portfolio IDs');
  }
}
export default fetchPortfolioIdsByGroupId;
