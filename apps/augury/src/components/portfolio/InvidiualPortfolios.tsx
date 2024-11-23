import { Stack } from '@chakra-ui/react';
import CreateGroupModal from './CreatePortfolioModal';
import PortfolioCard, { PortfolioInterface } from './PortfolioCard';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function IndividualPortfolio(): JSX.Element {
  const { groupId } = useParams<{ groupId: string }>();
  const [portfolios, setPortfolios] = useState<PortfolioInterface[]>([]); // State to store portfolios

  // Function to add a new portfolio to the portfolios array
  const addPortfolio = (portfolio: PortfolioInterface) => {
    setPortfolios((prevPortfolios) => [...prevPortfolios, portfolio]);
  };
  return (
    <>
      <CreateGroupModal groupId={groupId} onSave={addPortfolio} />
      <Stack spacing={4} mt={5}>
        {portfolios.map((portfolio, index) => (
          <PortfolioCard key={index} portfolioData={portfolio} />
        ))}
      </Stack>
    </>
  );
}
