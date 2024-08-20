import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { sendAuthenticatedRequest } from '../services/auth';
import { BarraNavegacionAdmin } from '../components/BarraNavegacionAdmin';

const AdminChangePassword = () => {
    const [formData, setFormData] = useState({
        current_password: '',
        new_password: '',
        confirm_password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await sendAuthenticatedRequest('http://localhost:8000/api/auth/admin/change-password/', 'PUT', formData);
            console.log('Password updated:', response);
            navigate('/admin/profile'); // Redirigir al perfil del administrador después del cambio de contraseña
        } catch (error) {
            setErrorMessage(error.message || 'Error changing password');
            console.error('Error changing password:', error);
        }
    };

    return (
        <Wrapper>
            <BarraNavegacionAdmin />
            <br />
            <br />
            <br />
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Label>Current Password</Label>
                    <Input 
                        type="password" 
                        name="current_password" 
                        value={formData.current_password} 
                        onChange={handleChange} 
                        required 
                    />
                    <Label>New Password</Label>
                    <Input 
                        type="password" 
                        name="new_password" 
                        value={formData.new_password} 
                        onChange={handleChange} 
                        required 
                    />
                    <Label>Confirm New Password</Label>
                    <Input 
                        type="password" 
                        name="confirm_password" 
                        value={formData.confirm_password} 
                        onChange={handleChange} 
                        required 
                    />
                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    <SubmitButton type="submit">Change Password</SubmitButton>
                </Form>
            </Container>
        </Wrapper>
    );
};

// Estilos
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

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 20px;
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

export default AdminChangePassword;
