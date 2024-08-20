import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { addClimbedRoute, getAllClimbedRoutes, deleteClimbedRoute } from '../services/admin';
import { BarraNavegacionAdmin } from '../components/BarraNavegacionAdmin';

const AdminAddRoute = () => {
    const [routeName, setRouteName] = useState('');
    const [grade, setGrade] = useState('');
    const [routes, setRoutes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRoutes();
    }, []);

    const fetchRoutes = async () => {
        try {
            const data = await getAllClimbedRoutes();
            setRoutes(data);
        } catch (error) {
            console.error('Error fetching routes:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { route_name: routeName, grade: grade };
            await addClimbedRoute(data);
            alert('Route added successfully!');
            fetchRoutes();  // Refresh the list of routes after adding a new one
        } catch (error) {
            console.error('Error adding route:', error);
            alert('Failed to add route.');
        }
    };

    const handleDelete = async (routeId) => {
        if (window.confirm('Are you sure you want to delete this route?')) {
            try {
                await deleteClimbedRoute(routeId);
                alert('Route deleted successfully!');
                fetchRoutes();  // Refresh the list of routes after deletion
            } catch (error) {
                console.error('Error deleting route:', error);
                alert('Failed to delete route.');
            }
        }
    };

    return (
        <Wrapper>
            <BarraNavegacionAdmin />
            <MainContainer>
                <LeftContainer>
                    <Form onSubmit={handleSubmit}>
                        <Label>Route Name</Label>
                        <Input
                            type="text"
                            value={routeName}
                            onChange={(e) => setRouteName(e.target.value)}
                            required
                        />
                        <Label>Grade</Label>
                        <Input
                            type="text"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            required
                        />
                        <SubmitButton type="submit">Add Route</SubmitButton>
                    </Form>
                </LeftContainer>
                <RightContainer>
                    <h2>All Climbed Routes</h2>
                    <RoutesList>
                        {routes.map(route => (
                            <RouteItem key={route.id}>
                                <RouteName>{route.route_name}</RouteName>
                                <RouteGrade>{route.grade}</RouteGrade>
                                <DeleteButton onClick={() => handleDelete(route.id)}>Delete</DeleteButton>
                            </RouteItem>
                        ))}
                    </RoutesList>
                </RightContainer>
            </MainContainer>
        </Wrapper>
    );
};

// Styled components
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MainContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 1200px;
    margin: 100px auto 0;
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const LeftContainer = styled.div`
    flex: 1;
    padding: 40px;
`;

const RightContainer = styled.div`
    flex: 2;
    padding: 40px;
    background-color: #fff;
    border-left: 1px solid #ccc;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    font-size: 18px;
    margin-bottom: 10px;
`;

const Input = styled.input`
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
`;

const SubmitButton = styled.button`
    padding: 12px 24px;
    background-color: #FF6633;
    color: white;
    border: 2px solid black;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;

    &:hover {
        background-color: #005582;
        color: white;
    }
`;

const RoutesList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const RouteItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
`;

const RouteName = styled.span`
    flex: 3;
    font-size: 16px;
    font-weight: bold;
`;

const RouteGrade = styled.span`
    flex: 1;
    text-align: right;
    font-size: 16px;
    color: #555;
`;

const DeleteButton = styled.button`
    padding: 8px 16px;
    background-color: #FF3333;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background-color: #CC0000;
    }
`;

export default AdminAddRoute;
