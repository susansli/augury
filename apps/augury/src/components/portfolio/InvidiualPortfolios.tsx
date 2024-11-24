import { Stack } from '@chakra-ui/react';
import CreateGroupModal from './CreatePortfolioModal';
import PortfolioCard, { PortfolioInterface } from './PortfolioCard';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SERVER_URL } from '../../api/Environments';
import axios from 'axios';
import portfolioIdAtom from './atoms/portfolioAtoms';
import { useRecoilValue } from 'recoil';
import fetchPortfolioIdsByGroupId from './utils/GetAllPortfolios';

export default function IndividualPortfolio(): JSX.Element {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [portfolios, setPortfolios] = useState<PortfolioInterface[]>([]);
  const portfolioId = useRecoilValue(portfolioIdAtom);
  const addPortfolio = (portfolio: PortfolioInterface) => {
    setPortfolios((prevPortfolios) => [...prevPortfolios, portfolio]);
  };
  useEffect(() => {
    async function fetchData() {
      console.log('Fetching portfolios for groupId:', groupId);
      setLoading(true);
      if (!groupId) {
        console.error('No groupId provided');
        setLoading(false);
        return;
      }

      try {
        const portfolioIds = await fetchPortfolioIdsByGroupId(groupId);
        console.log('Fetched Portfolio IDs:', portfolioIds);

        const portfolioPromises = portfolioIds.map((id: string) =>
          axios.get(`${SERVER_URL}/portfolio/${id}`).then((res) => res.data)
        );
        const portfoliosData = await Promise.all(portfolioPromises);

        const normalizedPortfolios = portfoliosData.map((data) => ({
          ...data.portfolio,
          id: data.portfolio.id, // Ensure id is accessible
        }));
        setPortfolios(normalizedPortfolios);
        console.log('Normalized Portfolios:', normalizedPortfolios);
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [groupId]);
  function enterPortfolio(portfolioId: string) {
    console.log('portfolio ID from navigate', portfolioId);
    navigate(`/stock/${portfolioId}`);
  }
  return (
    <>
      <CreateGroupModal groupId={groupId} onSave={addPortfolio} />
      <Stack spacing={4} mt={5}>
        {portfolios.map((portfolio) => (
          <PortfolioCard
            key={portfolio.id}
            portfolioData={portfolio}
            onClick={() => enterPortfolio(portfolio.id)}
          />
        ))}
      </Stack>
    </>
  );
}
