import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { getTrainingStats } from '../../services/train';
import { sendAuthenticatedRequest } from '../../services/auth';  // Asegúrate de importar correctamente

const RightProfile = () => {
  const [stats, setStats] = useState({
    this_week: { trainings: 0, routes: 0, duration: 0 },
    this_month: { trainings: 0, routes: 0, duration: 0 },
    total: { trainings: 0, routes: 0, duration: 0 },
  });

  const [gradeData, setGradeData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    getTrainingStats()
      .then(data => {
        setStats(data);

        const formattedData = Object.keys(data.grade_percentages).map(key => ({
          name: key,
          value: data.grade_percentages[key],
        }));
        setGradeData(formattedData);
      })
      .catch(error => console.error('Error fetching training stats:', error));

    sendAuthenticatedRequest('http://localhost:8000/api/training/climbing-time/', 'GET')
      .then(data => setWeeklyData(data))
      .catch(error => console.error('Error fetching weekly climbing data:', error));
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF3333', '#33FF33', '#3333FF'];

  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index, name
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
      >
        {`${name}: ${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <Container>
      <DashboardCard>
        <div>
          <ActivitieMetrics>
            <h5>This week</h5>
            <div>
              <p>Trainings</p>
              <span>{stats.this_week.trainings}</span>
            </div>
            <div>
              <p>Routes </p>
              <span>{stats.this_week.routes}</span>
            </div>
            <div>
              <p>Duration</p>
              <span>{stats.this_week.duration}</span>
            </div>
          </ActivitieMetrics>
          <ProjectMetrics>
            <h5>This month</h5>
            <div>
              <p>Trainings</p>
              <span>{stats.this_month.trainings}</span>
            </div>
            <div>
              <p>Routes</p>
              <span>{stats.this_month.routes}</span>
            </div>
            <div>
              <p>Duration</p>
              <span>{stats.this_month.duration}</span>
            </div>
          </ProjectMetrics>
          <TotalMetrics>
            <h5>Total</h5>
            <div>
              <p>Trainings</p>
              <span>{stats.total.trainings}</span>
            </div>
            <div>
              <p>Routes</p>
              <span>{stats.total.routes}</span>
            </div>
            <div>
              <p>Duration</p>
              <span>{stats.total.duration}</span>
            </div>
          </TotalMetrics>
        </div>
      </DashboardCard>

      <BirthdayCard>
        <div>
          <img src="/images/bolo-de-aniversario.png" alt="" />
          <span>Grades</span>
        </div>
      </BirthdayCard>

      <BirthdayInfo>
        {gradeData.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={gradeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {gradeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p>No grade data available</p>
        )}
      </BirthdayInfo>

      <PendencesCard>
        <div>
          <img src="/images/flexible.png" alt="" />
          <span>Tiempo escalando</span>
        </div>
      </PendencesCard>

      <PendencesInfo>
        {weeklyData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week_end" tick={false} />
              <YAxis label={{ value: 'Tiempo escalado (mins)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="total_time" fill="#FF6633" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No climbing data available</p>
        )}
      </PendencesInfo>
    </Container>
  );
};

const Container = styled.div`
  grid-area: rightside;
  font-family: Arial;
  padding: 20px; /* Agrega padding alrededor del contenedor */
  background-color: #f4f4f4; /* Color de fondo para todo el contenedor */
`;

const DashboardCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 16px; /* Aumenta el margen inferior para dar espacio */
  background-color: #fff;
  border-radius: 10px; /* Aumenta el borde redondeado */
  position: relative;
  border: 1.5px solid #FF6633;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Aumenta la sombra para mayor contraste */
  padding: 20px; /* Aumenta el padding para más espacio interno */

  & > div {
    display: flex;
    justify-content: space-between;
  }
`;

const ActivitieMetrics = styled.div`
  display: flex;
  width: 33%;
  flex-direction: column;
  border: 2px solid orange; /* Disminuye el grosor del borde */
  border-radius: 6px;
  margin-top: 4px;
  margin-right: 4px;
  position: relative;
  font-size: 14px; /* Aumenta el tamaño de la fuente */
  padding-bottom: 20px; /* Aumenta el padding inferior */

  div {
    display: flex;
    justify-content: space-between;
  }

  & h5 {
    display: flex;
    padding: 10px;
    justify-content: center;
  }
  & p {
    display: flex;
    text-align: left;
    line-height: 2;
    margin-left: 5px;
    align-items: center;
  }

  & span {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 5px;
  }
`;

const ProjectMetrics = styled.div`
  display: flex;
  width: 33%;
  flex-direction: column;
  border: 2px solid orange;
  border-radius: 6px;
  margin-top: 4px;
  margin-right: 4px;
  font-size: 14px;
  padding-bottom: 20px;

  div {
    display: flex;
    justify-content: space-between;
  }

  & h5 {
    display: flex;
    padding: 10px;
    justify-content: center;
  }
  & p {
    display: flex;
    text-align: left;
    line-height: 2;
    margin-left: 5px;
  }
  & span {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 5px;
  }
`;

const TotalMetrics = styled.div`
  display: flex;
  width: 33%;
  flex-direction: column;
  border: 2px solid orange;
  border-radius: 6px;
  margin-top: 4px;
  font-size: 14px;
  padding-bottom: 20px;

  div {
    display: flex;
    justify-content: space-between;
  }

  & h5 {
    display: flex;
    justify-content: center;
    padding: 10px;
  }

  & p {
    display: flex;
    text-align: left;
    line-height: 2;
    margin-left: 5px;
  }
  & span {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 5px;
  }
`;

const BirthdayCard = styled.div`
  display: flex;
  text-align: center;
  overflow: hidden;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  padding: 15px;
  border-bottom: 5px solid rgba(0, 0, 0, 0.1);
  justify-content: center;
  border: 1.5px solid #FF6633;

  & div {
    display: flex;
    align-items: center;
  }

  & span {
    margin-left: 5px;
  }
`;

const BirthdayInfo = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 16px; /* Aumenta el margen inferior */
  background-color: #fff;
  border-radius: 0 0 10px 10px; /* Aumenta el borde redondeado */
  border-top: none;
  border: 1.5px solid #FF6633;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  padding: 25px; /* Aumenta el padding */
`;

const PendencesCard = styled.div`
  display: flex;
  text-align: center;
  overflow: hidden;
  background-color: #fff;
  border: 1.5px solid #FF6633;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  padding: 15px;
  margin-bottom: 1px;
  justify-content: center;

  & div {
    display: flex;
    align-items: center;
  }

  & span {
    margin-left: 5px;
  }
`;

const PendencesInfo = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 16px;
  background-color: #fff;
  border-radius: 0 0 10px 10px;
  border: 1.5px solid #FF6633;
  border-top: none;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  padding: 30px; /* Aumenta el padding */
`;

const DateLine = styled.div`
  display: flex;
  text-align: left;
  height: 30px;
  overflow: hidden;
  position: relative;
  border: 3px rgba(0, 0, 0, 0.09);
  align-items: center;
  background-color: rgba(0, 0, 0, 0.09);

  & p {
    margin-left: 5px;
  }
`;

export default RightProfile;