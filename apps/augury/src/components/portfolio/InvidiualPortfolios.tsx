import { Stack, useDisclosure } from '@chakra-ui/react';
import CreateGroupModal from './CreatePortfolioModal';
import PortfolioCard, { PortfolioInterface } from './PortfolioCard';
import { useState } from 'react';
import AddButton from '../generic/AddButton';

export default function IndividualPortfolio(): JSX.Element {
  const disclosure = useDisclosure();
  const [portfolios, setPortfolios] = useState<PortfolioInterface[]>([]); // State to store portfolios

  // Function to add a new portfolio to the portfolios array
  const addPortfolio = (portfolio: PortfolioInterface) => {
    setPortfolios((prevPortfolios) => [...prevPortfolios, portfolio]);
  };
  return (
    <>
      <CreateGroupModal onSave={addPortfolio} />
      <Stack spacing={4} mt={5}>
        {portfolios.map((portfolio, index) => (
          <PortfolioCard key={index} portfolioData={portfolio} />
        ))}
      </Stack>
    </>
  );
}
