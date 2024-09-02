import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { sendAuthenticatedRequest } from '../../services/auth';
import { useParams } from 'react-router-dom';

const AdminRightProfile = () => {
  const [stats, setStats] = useState({
    total_trainings: 0,
    total_routes: 0,
    total_duration: 0,
  });

  const { userId } = useParams(); // Para obtener el userId desde la URL

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await sendAuthenticatedRequest(
          `http://localhost:8000/api/admin/users/${userId}/stats/`,
          'GET'
        );
        setStats(response);
      } catch (error) {
        console.error('Error fetching training stats:', error);
      }
    };

    fetchStats();
  }, [userId]);

  return (
    <Container>
      <DashboardCard>
        <TotalMetrics>
          <h5>Estadísticas Totales</h5>
          <MetricItem>
            <MetricLabel>Entrenamientos Totales:</MetricLabel>
            <MetricValue>{stats.total_trainings}</MetricValue>
          </MetricItem>
          <MetricItem>
            <MetricLabel>Rutas Totales:</MetricLabel>
            <MetricValue>{stats.total_routes}</MetricValue>
          </MetricItem>
          <MetricItem>
            <MetricLabel>Duración Total:</MetricLabel>
            <MetricValue>{stats.total_duration} minutos</MetricValue>
          </MetricItem>
        </TotalMetrics>
      </DashboardCard>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  grid-area: rightside;
  font-family: Arial, sans-serif;
  padding: 20px; 
  background-color: #f4f4f4; 
`;

const DashboardCard = styled.div`
  text-align: left;
  overflow: hidden;
  margin-bottom: 16px;
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  border: 1.5px solid #FF6633;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const TotalMetrics = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid orange;
  border-radius: 6px;
  padding: 20px;
`;

const MetricItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const MetricLabel = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const MetricValue = styled.span`
  font-size: 16px;
  color: #000;
`;

export default AdminRightProfile;
