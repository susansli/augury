import { Box, Icon, IconButton, Stack, useDisclosure } from '@chakra-ui/react';
import CreateGroupModal from '../components/portfolio/CreatePortfolioModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PortfolioCard, {
  PortfolioInterface,
} from '../components/portfolio/PortfolioCard';
import { useState } from 'react';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import PortfolioGroupList from '../components/portfolio/PortfolioGroupList';
import IndividualPortfolio from '../components/portfolio/InvidiualPortfolios';

export default function Portfolio(): JSX.Element {
  return <PortfolioGroupList />;
}
