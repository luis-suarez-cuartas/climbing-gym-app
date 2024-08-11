import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getTrainingStats } from '../../services/train'; 

const RightProfile = () => {
  const [stats, setStats] = useState({
    this_week: { trainings: 0, routes: 0, duration: 0 },
    this_month: { trainings: 0, routes: 0, duration: 0 },
    total: { trainings: 0, routes: 0, duration: 0 },
  });

  const [gradeData, setGradeData] = useState([]);

  useEffect(() => {
    getTrainingStats()
      .then(data => {
        setStats(data);

        // Formatear los datos del porcentaje de grados para el gráfico de pastel
        const formattedData = Object.keys(data.grade_percentages).map(key => ({
          name: key,
          value: data.grade_percentages[key],
        }));
        setGradeData(formattedData);
      })
      .catch(error => console.error('Error fetching training stats:', error));
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
          <span>Pendences</span>
        </div>
      </PendencesCard>
      <DateLine>
        <p>Qua, 28 de Jul 2021</p>
      </DateLine>
      <PendencesInfo>
        <p>You have no pending issues</p>
      </PendencesInfo>
    </Container>
  );
};

const Container = styled.div`
  grid-area: rightside;
  font-family: Arial;
`;

const DashboardCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: 1.5px solid #FF6633;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 0 0 rgb(0, 0, 0, 0.20);
  padding: 12px;

  & > div {
    display: flex;
    justify-content: space-between;
  }
`;

const ActivitieMetrics = styled.div`
  display: flex;
  width: 33%;
  flex-direction: column;
  border: 3px solid orange;
  border-radius: 6px;
  margin-top: 4px;
  margin-right: 4px;
  position: relative;
  font-size: 12px;
  padding-bottom: 15px;

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
  border: 3px solid orange;
  border-radius: 6px;
  margin-top: 4px;
  margin-right: 4px;
  font-size: 12px;
  padding-bottom: 15px;

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
  border: 3px solid orange;
  border-radius: 6px;
  margin-top: 4px;
  font-size: 12px;
  padding-bottom: 15px;

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
  border-radius: 5px 5px 0 0;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 0 0 rgb(0, 0, 0, 0.20);
  padding: 15px;
  border-bottom: 5px solid rgba(0, 0, 0, 0.15);
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
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 0 0 5px 5px;
  border-top: none;
  border: 1.5px solid #FF6633;
  position: relative;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 0 0 rgb(0, 0, 0, 0.20);
  padding: 20px;
`;

const PendencesCard = styled.div`
  display: flex;
  text-align: center;
  overflow: hidden;
  background-color: #fff;
  border-radius: 5px 5px 0 0;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 0 0 rgb(0, 0, 0, 0.20);
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
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 0 0 5px 5px;
  border-top: none;
  position: relative;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 0 0 rgb(0, 0, 0, 0.20);
  padding: 20px;
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