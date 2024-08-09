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
  Legend
} from "recharts";
import TrainingDetailTable from '../components/TrainingDetailTable';

const Sesion = () => {
  const { training_id } = useParams(); // Correcto uso de `training_id`
  const [trainingData, setTrainingData] = useState(null);

  useEffect(() => {
    const fetchTrainingDetails = async () => {
      try {
        const data = await getTrainingDetails(training_id); // Correcto uso de `training_id`
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

  // Preparar datos para el gráfico de barras usando el nombre real de la ruta
  const chartData = trainingData.routes.map(route => ({
    name: route.route_name, // Usa el nombre real de la ruta
    timeTaken: route.time_taken,
  }));

  const colors = [
    "#FF6633",
    "#FF6633",
    "#FF6633",
    "#FF6633",
    "#FF6633",
    "#FF6633",
    "#FF6633",
    "#FF6633",
  ];

  return (
    <Container>
      <BarraNavegacion />
      <br />
      <br />
      <br />
      <CardContainer>
        <UserInfo>
          <ProfileImage src="/imagenes/profile.jpg" alt="User Profile" />
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

        {/* Añadir gráfico de barras con más espacio y centrado */}
        <ChartContainer>
          <BarChart width={600} height={300} data={chartData} barCategoryGap="1%">
            <CartesianGrid strokeDasharray="3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend iconType="circle" />
            <Bar dataKey="timeTaken">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>

        {/* Añadir tabla de detalles */}
        <TrainingDetailTable routes={trainingData.routes} />
      </CardContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;
  padding-top: 60px;
  box-sizing: border-box;
`;

const CardContainer = styled.div`
  width: 100%;
  margin: 20px auto;
  padding: 40px 20px;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  font-family: Arial, sans-serif;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: none;
  text-align: center;
`;

const ActivityTitle = styled.h2`
  margin: 50px 0 30px;
  font-size: 24px;
  font-weight: bold;
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

const ActivityDate = styled.span`
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
  margin: 40px 0; /* Aumenta el espacio alrededor de la gráfica */
`;

export default Sesion;
