import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BarraNavegacion } from '../components/BarraNavegacion';
import { getUserRankings } from '../services/ranking';

const Rankings = () => {
  const [selectedTab, setSelectedTab] = useState('TimeClimbing');
  const [rankingsData, setRankingsData] = useState([]);

  useEffect(() => {
    getUserRankings()
      .then(data => {
        console.log('Data fetched from API:', data);
        setRankingsData(data);
      })
      .catch(error => {
        console.error('Error fetching user rankings:', error);
      });
  }, []);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const renderRanking = () => {
    let filteredData = [];

    if (selectedTab === 'TimeClimbing') {
      filteredData = rankingsData.slice().sort((a, b) => b.total_time_climbed - a.total_time_climbed);
      console.log('Rendering TimeClimbing Data:', filteredData);
    } else if (selectedTab === 'RoutesClimbed') {
      filteredData = rankingsData.slice().sort((a, b) => b.total_routes_climbed - a.total_routes_climbed);
      console.log('Rendering RoutesClimbed Data:', filteredData);
    }

    return <RankingList data={filteredData} selectedTab={selectedTab} />;
  };

  return (
    <div>
      <BarraNavegacion />
      <Container>
        <Tabs>
          <Tab selected={selectedTab === 'TimeClimbing'} onClick={() => handleTabClick('TimeClimbing')}>
            Time Climbing
          </Tab>
          <Tab selected={selectedTab === 'RoutesClimbed'} onClick={() => handleTabClick('RoutesClimbed')}>
            Routes Climbed
          </Tab>
        </Tabs>
        {renderRanking()}
      </Container>
    </div>
  );
};

const RankingList = ({ data = [], selectedTab }) => {
  console.log('Data passed to RankingList:', data);
  return (
    <RankingContainer>
      {data.map((item, index) => {
        const imageUrl = item.image ? `${item.image}` : "/imagenes/fotocv.jpg";
        return (
          <RankingItem key={index}>
            <RankingPosition>{index + 1}. </RankingPosition>
            <RankingImage src={imageUrl} alt={item.user_name} />
            <Name>{item.user_name}</Name>
            <Points>{selectedTab === 'TimeClimbing' ? item.total_time_climbed : item.total_routes_climbed}</Points>
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

export default Rankings;
