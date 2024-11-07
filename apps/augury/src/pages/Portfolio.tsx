import { Box, Icon, IconButton, Stack, useDisclosure } from '@chakra-ui/react';
import CreateGroupModal from '../components/portfolio/CreatePortfolioModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PortfolioCard, {
  PortfolioInterface,
} from '../components/portfolio/PortfolioCard';
import { useState } from 'react';

export default function Portfolio(): JSX.Element {
  const disclosure = useDisclosure();
  const [portfolios, setPortfolios] = useState<PortfolioInterface[]>([]); // State to store portfolios

  // Function to add a new portfolio to the portfolios array
  const addPortfolio = (portfolio: PortfolioInterface) => {
    setPortfolios((prevPortfolios) => [...prevPortfolios, portfolio]);
  };
  return (
    <>
      <Box position="fixed" bottom="20" right="4" zIndex="overlay">
        <IconButton
          icon={<Icon as={FontAwesomeIcon} icon={faPlus} color="text.body" />}
          onClick={disclosure.onOpen}
          aria-label="Open Portfolio Modal"
          colorScheme="gray"
          borderRadius="full"
          size="lg"
          shadow="lg"
        />
      </Box>
      <CreateGroupModal onSave={addPortfolio} />
      <Stack spacing={4} mt={5}>
        {portfolios.map((portfolio, index) => (
          <PortfolioCard key={index} portfolioData={portfolio} />
        ))}
      </Stack>
    </>
  );
}
