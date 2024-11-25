import { Stack } from '@chakra-ui/react';
import CreateGroupModal from './CreatePortfolioModal';
import PortfolioCard, { PortfolioInterface } from './PortfolioCard';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SERVER_URL } from '../../api/Environments';
import axios from 'axios';
import fetchPortfolioIdsByGroupId from './utils/GetAllPortfolios';

export default function IndividualPortfolio(): JSX.Element {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [portfolios, setPortfolios] = useState<PortfolioInterface[]>([]);
  const addPortfolio = (portfolio: PortfolioInterface) => {
    setPortfolios((prevPortfolios) => [...prevPortfolios, portfolio]);
  };
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (!groupId) {
        console.error('No groupId provided');
        setLoading(false);
        return;
      }

      try {
        const portfolioIds = await fetchPortfolioIdsByGroupId(groupId);

        const portfolioPromises = portfolioIds.map((id: string) =>
          axios.get(`${SERVER_URL}/portfolio/${id}`).then((res) => res.data)
        );
        const portfoliosData = await Promise.all(portfolioPromises);

        const normalizedPortfolios = portfoliosData.map((data) => ({
          ...data.portfolio,
          id: data.portfolio.id,
        }));
        setPortfolios(normalizedPortfolios);
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [groupId]);
  function enterPortfolio(portfolioId: string) {
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
