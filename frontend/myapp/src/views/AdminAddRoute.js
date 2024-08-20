import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { addClimbedRoute } from '../services/admin';
import { BarraNavegacionAdmin } from '../components/BarraNavegacionAdmin';

const AdminAddRoute = () => {
    const [routeName, setRouteName] = useState('');
    const [grade, setGrade] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { route_name: routeName, grade: grade };
            await addClimbedRoute(data);
            alert('Route added successfully!');
            navigate('/admin/routes');  // Navigate to a route list page or anywhere you want after success
        } catch (error) {
            console.error('Error adding route:', error);
            alert('Failed to add route.');
        }
    };

    return (
        <Wrapper>
            <BarraNavegacionAdmin />
            <Container>
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
            </Container>
        </Wrapper>
    );
};

// Styled components
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 100px auto 0;
    padding: 40px;
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
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

export default AdminAddRoute;
