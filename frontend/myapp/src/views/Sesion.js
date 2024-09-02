import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BarraNavegacion } from '../components/BarraNavegacion';
import { getTrainingDetails } from '../services/train';
import { useParams } from 'react-router-dom';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie
} from 'recharts';
import TrainingDetailTable from '../components/TrainingDetailTable';

const Sesion = () => {
  const { training_id } = useParams();
  const [trainingData, setTrainingData] = useState(null);

  useEffect(() => {
    const fetchTrainingDetails = async () => {
      try {
        const data = await getTrainingDetails(training_id);
        setTrainingData(data);
      } catch (error) {
        console.error('Error fetching training details:', error);
      }
    };

    fetchTrainingDetails();
  }, [training_id]);

  if (!trainingData) {
    return <div>Loading...</div>;
  }

  const chartData = trainingData.routes.map(route => ({
    name: route.route_name,
    timeTaken: route.time_taken,
  }));

  const barColors = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#99FF99",
    "#B34D4D"
  ];

  const gradeData = Object.keys(trainingData.grade_percentages).map(grade => ({
    name: grade,
    value: trainingData.grade_percentages[grade],
  }));

  const pieColors = [
    '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', 
    '#00B3E6', '#E6B333', '#3366E6', '#99FF99', 
    '#B34D4D'
  ];

  return (
    <div>
      <BarraNavegacion />
      <br />
      <br />
      <br />
      <br />
      <br />
    <div style={appStyles}>
      <ContentWrapper>
        <CardContainer>
          <UserInfo>
            <ProfileImage src={trainingData.profile_picture || "/imagenes/profile.jpg"} alt="User Profile" />
            <UserDetails>
              <UserName>{trainingData.user_name}</UserName>
              <ActivityInfo>
                <ActivityDate>{trainingData.activity_date}</ActivityDate>
              </ActivityInfo>
            </UserDetails>
          </UserInfo>
          <ActivityTitle>{trainingData.activity_title}</ActivityTitle>

          <ActivityStats>
            <StatItem>
              <StatLabel>Duración total</StatLabel>
              <StatValue>{trainingData.total_duration} min</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Tiempo escalando</StatLabel>
              <StatValue>{trainingData.total_time_climbed} s</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Vías escaladas</StatLabel>
              <StatValue>{trainingData.routes_count}</StatValue>
            </StatItem>
          </ActivityStats>

          <ChartContainer>
            <BarChart width={600} height={300} data={chartData} barCategoryGap="1%">
              <CartesianGrid strokeDasharray="3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend iconType="circle" />
              <Bar dataKey="timeTaken">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>

          <ChartContainer>
            <PieChart width={400} height={400}>
              <Pie
                data={gradeData}
                cx={200}
                cy={200}
                labelLine={false}
                label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {gradeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ChartContainer>

          <TrainingDetailTable routes={trainingData.routes} />
        </CardContainer>
      </ContentWrapper>
    </div>
  </div>
  );
};

const navStyles = {
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 1000,
  backgroundColor: '#000'
};

const appStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  paddingTop: '60px'
};

const ContentWrapper = styled.div`
  padding-top: 80px; /* Ajusta según la altura de tu barra de navegación */
  background-color: #FFFFFF;
  width: 90%; /* Ajustado a 90% para mayor uso del espacio */
  margin: 0 auto;
`;

const CardContainer = styled.div`
  margin: 18px 0 18px;
  overflow: visible;
  font-family: Arial, sans-serif;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto 50px auto;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 30px;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UserName = styled.span`
  font-weight: bold;
  font-size: 24px;
`;

const ActivityInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: gray;
  font-size: 16px;
`;

const ActivityDate = styled.span``;

const ActivityTitle = styled.h2`
  margin: 50px 0 30px;
  font-size: 24px;
  font-weight: bold;
`;

const ActivityStats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatLabel = styled.p`
  margin: 0;
  font-weight: bold;
  color: gray;
  font-size: 14px;
`;

const StatValue = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
`;


export default Sesion;