// components/PortfolioGroupList.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { SimpleGrid, Text, VStack } from '@chakra-ui/react';
import PortfolioGroupCard from './PortfolioGroupCard';
import { SERVER_URL } from '../../api/Environments';
import CreatePortfolioModal from './CreatePortfolioModal';
import AuthStoreManager from '../../helpers/AuthStoreManager';
import PortfolioGroupModal from './PortfolioGroupModal';

const PortfolioGroupList = () => {
  const userId = AuthStoreManager.getUserId();
  const [portfolioGroups, setPortfolioGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPortfolioGroups();
  }, [userId]);

  // Fetch portfolio groups by userId
  const fetchPortfolioGroups = async () => {
    setLoading(true);
    console.log(userId);
    try {
      const response = await axios.get(
        `${SERVER_URL}/portfolio/group/user/${userId}`
      );
      setPortfolioGroups(response.data.groups || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const enterPortfolioGroup = (portfolioGroupId: string) => {
    navigate(`/portfolios/${portfolioGroupId}`);
  };

  const handleSave = () => {
    fetchPortfolioGroups();
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <VStack spacing={6} align="stretch">
      <PortfolioGroupModal onSave={handleSave} />
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
