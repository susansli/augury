import { Box, Icon, IconButton, useDisclosure } from '@chakra-ui/react';
import CreateGroupModal from '../components/portfolio/CreateGroupModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PortfolioGroupList from '../components/portfolio/PortfolioGroupList';

export default function Portfolio(): JSX.Element {
  const disclosure = useDisclosure();

  return (
    <>
      <PortfolioGroupList />
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
      <CreateGroupModal disclosure={disclosure} />
    </>
  );
}
