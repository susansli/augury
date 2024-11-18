import { Box, Card, CardBody, Link, Stack, Text } from '@chakra-ui/react';
import CreateGroupModal from './CreatePortfolioModal';
import PortfolioCard, { PortfolioInterface } from './PortfolioCard';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortfolioStats from './PortfolioStats';

export default function IndividualPortfolio(): JSX.Element {
  const { groupId } = useParams<{ groupId: string }>();
  const [portfolios, setPortfolios] = useState<PortfolioInterface[]>([]); // State to store portfolios
  const navigate = useNavigate();

  const exitPortfolioGroup = () => {
    navigate(`/portfolio`);
  };

  // Function to add a new portfolio to the portfolios array
  const addPortfolio = (portfolio: PortfolioInterface) => {
    setPortfolios((prevPortfolios) => [...prevPortfolios, portfolio]);
  };
  return (
    <>
      <CreateGroupModal groupId={groupId} onSave={addPortfolio} />
      <Stack>
        {/* Back button */}
        <Box onClick={() => exitPortfolioGroup()}>
          <Text>Back</Text>
        </Box>

        {/* Details about portfolio group */}
        <Card
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          shadow="md"
          backgroundColor="background.selBg"
        >
          <CardBody>
            <PortfolioStats portfolios={portfolios} />
          </CardBody>
        </Card>

        <Stack spacing={4} mt={5}>
          {portfolios.map((portfolio, index) => (
            <PortfolioCard key={index} portfolioData={portfolio} />
          ))}
        </Stack>
      </Stack>
    </>
  );
}
