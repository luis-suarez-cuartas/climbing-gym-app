import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getRoutePercentages } from '../services/admin';
import { BarraNavegacionAdmin } from '../components/BarraNavegacionAdmin';  

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF3333', '#33FF33', '#3333FF'];

const AdminStats = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const percentages = await getRoutePercentages();
                const formattedData = Object.keys(percentages).map((key, index) => ({
                    name: key,
                    value: percentages[key],
                }));
                setData(formattedData);
            } catch (error) {
                console.error('Error fetching route percentages:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <BarraNavegacionAdmin />
            <MainContainer>
                <Container>
                    <Title>Route Climbing Percentages</Title>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Container>
            </MainContainer>
        </>
    );
};

// Ensure there is enough space at the top to prevent overlapping with the navigation bar
const MainContainer = styled.div`
    padding-top: 100px; /* Adjust this value if your navigation bar height changes */
    display: flex;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px; /* Smaller font size */
    color: #FF6633; /* Custom color */
`;

export default AdminStats;
