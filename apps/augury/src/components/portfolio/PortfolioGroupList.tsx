// components/PortfolioGroupList.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { SimpleGrid, Text, VStack } from '@chakra-ui/react';
import PortfolioGroupCard from './PortfolioGroupCard';
import PortfolioGroupModal from './PortfolioGroupModal';
import AddButton from '../generic/AddButton';
import { SERVER_URL } from '../../api/Environments';
import CreatePortfolioModal from './CreatePortfolioModal';

const PortfolioGroupList = () => {
  const { id: userId } = useParams(); // Assuming `id` is passed as a route parameter
  const [portfolioGroups, setPortfolioGroups] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPortfolioGroups();
  }, [userId]);

  // Fetch portfolio groups by userId
  const fetchPortfolioGroups = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${SERVER_URL}/portfolio/group/user/672a6e7501ca4cc969f7ac3b`
      );
      setPortfolioGroups(response.data.groups || []); // Set portfolio groups or default to empty array
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const enterPortfolioGroup = (portfolioGroupId: string) => {
    navigate(`/portfolios/${portfolioGroupId}`);
  };

  // Handle save callback from modal
  const handleSave = () => {
    fetchPortfolioGroups(); // Refresh the list after creating a new portfolio group
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <VStack spacing={6} align="stretch">
      <CreatePortfolioModal onSave={handleSave} />
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {portfolioGroups.length > 0 ? (
          portfolioGroups.map((group) => (
            <PortfolioGroupCard
              key={group._id}
              portfolioGroup={group}
              onClick={() => enterPortfolioGroup(group.id)}
            />
          ))
        ) : (
          <Text>No portfolio groups found for this user.</Text>
        )}
      </SimpleGrid>
    </VStack>
  );
};

export default PortfolioGroupList;
