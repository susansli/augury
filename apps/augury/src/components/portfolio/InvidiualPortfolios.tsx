import { Stack } from '@chakra-ui/react';
import CreateGroupModal from './CreatePortfolioModal';
import PortfolioCard, { PortfolioInterface } from './PortfolioCard';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SERVER_URL } from '../../api/Environments';
import axios from 'axios';
import portfolioIdAtom from './atoms/portfolioAtoms';
import { useRecoilValue } from 'recoil';

export default function IndividualPortfolio(): JSX.Element {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState<PortfolioInterface[]>([]);
  const portfolioId = useRecoilValue(portfolioIdAtom);
  const addPortfolio = (portfolio: PortfolioInterface) => {
    setPortfolios((prevPortfolios) => [...prevPortfolios, portfolio]);
  };
  useEffect(() => {
    console.log(portfolioId);
    fetchPortfolio();
  });
  function enterPortfolio(portfolioGroupId: string) {
    navigate(`/stock/${portfolioId}`);
  }
  async function fetchPortfolio() {
    try {
      const response = await axios.get(
        `${SERVER_URL}/portfolio/${portfolioId}`
      );
      console.log(response.data);
      setPortfolios([response.data] || []);
    } catch (err) {
      console.error(err);
    }
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
