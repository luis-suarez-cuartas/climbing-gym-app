import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { BarraNavegacionAdmin } from '../components/BarraNavegacionAdmin';
import { 
    getMostTrainings,
    getMostClimbedRoutes,
    getTotalTrainingTime,
    getMostPopularPublications,
    getMostLikes 
} from '../services/ranking';

const AdminRanking = () => {
  const [selectedTab, setSelectedTab] = useState('MostTrainings');
  const [rankingsData, setRankingsData] = useState([]);

  const fetchRankings = useCallback(() => {
    let fetchFunction;
    
    switch(selectedTab) {
      case 'MostTrainings':
        fetchFunction = getMostTrainings;
        break;
      case 'MostClimbedRoutes':
        fetchFunction = getMostClimbedRoutes;
        break;
      case 'TotalTrainingTime':
        fetchFunction = getTotalTrainingTime;
        break;
      case 'MostPopularPublications':
        fetchFunction = getMostPopularPublications;
        break;
      case 'MostLikes':
        fetchFunction = getMostLikes;
        break;
      default:
        fetchFunction = getMostTrainings;
    }

    fetchFunction()
      .then(data => {
        console.log(`Data fetched for ${selectedTab}:`, data);
        setRankingsData(data);
      })
      .catch(error => {
        console.error(`Error fetching ${selectedTab} rankings:`, error);
      });
  }, [selectedTab]);

  useEffect(() => {
    fetchRankings();
  }, [fetchRankings]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <BarraNavegacionAdmin />
      <Container>
        <Tabs>
          <Tab selected={selectedTab === 'MostTrainings'} onClick={() => handleTabClick('MostTrainings')}>
            Most Trainings
          </Tab>
          <Tab selected={selectedTab === 'MostClimbedRoutes'} onClick={() => handleTabClick('MostClimbedRoutes')}>
            Most Climbed Routes
          </Tab>
          <Tab selected={selectedTab === 'TotalTrainingTime'} onClick={() => handleTabClick('TotalTrainingTime')}>
            Total Training Time
          </Tab>
          <Tab selected={selectedTab === 'MostPopularPublications'} onClick={() => handleTabClick('MostPopularPublications')}>
            Most Popular Publications
          </Tab>
          <Tab selected={selectedTab === 'MostLikes'} onClick={() => handleTabClick('MostLikes')}>
            Most Likes
          </Tab>
        </Tabs>
        <RankingList data={rankingsData} selectedTab={selectedTab} />
      </Container>
    </div>
  );
};

const RankingList = ({ data = [], selectedTab }) => {
  return (
    <RankingContainer>
      {data.map((item, index) => {
        return (
          <RankingItem key={index}>
            <RankingPosition>{index + 1}. </RankingPosition>
            {item.image && <RankingImage src={item.image} alt={item.user_name} />}
            <Name>{item.user_name || item.route_name || item.title}</Name>
            <Points>
              {selectedTab === 'MostTrainings' && item.total_trainings}
              {selectedTab === 'MostClimbedRoutes' && item.times_climbed}
              {selectedTab === 'TotalTrainingTime' && item.total_time_climbed}
              {selectedTab === 'MostPopularPublications' && item.total_interactions}
              {selectedTab === 'MostLikes' && item.total_likes}
            </Points>
          </RankingItem>
        );
      })}
    </RankingContainer>
  );
};

// Styled Components...
const Container = styled.div`
  width: 75%;
  margin: 0 auto;
  background-color: #FFFFFF;
  padding: 20px;
  margin-top: 100px;
  border: 2px solid orange;
  border-radius: 10px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  background-color: ${(props) => (props.selected ? '#FF9966' : '#E5E8E8')};
  color: #000;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: #FF9966;
  }
`;

const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 20px;
`;

const RankingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #F3F4F6;
  border-radius: 10px;
  border: 1px solid #CCC;
`;

const RankingPosition = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
`;

const RankingImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
`;

const Name = styled.span`
  font-size: 18px;
  font-weight: bold;
  flex-grow: 1;
`;

const Points = styled.span`
  font-size: 18px;
  color: #555;
  margin-left: auto;
`;

export default AdminRanking;
