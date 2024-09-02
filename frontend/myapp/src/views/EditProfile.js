import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { BarraNavegacion } from '../components/BarraNavegacion';
import { sendAuthenticatedRequest } from '../services/auth'; // Asegúrate de importar la función correctamente

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    profile_picture: null,
    email: ''
  });
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await sendAuthenticatedRequest('https://climbing-app-2405933cdb44.herokuapp.com/api/auth/profile/', 'GET');
        setFormData({
          name: response.name,
          profile_picture: response.profile_picture,
          email: response.email
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'profile_picture' && files.length > 0) {
      setFormData(prevState => ({
        ...prevState,
        profile_picture: files[0]
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedData = new FormData();

    // Añade el nombre al FormData
    updatedData.append('name', formData.name);

    // Añade la imagen al FormData solo si es un archivo
    if (formData.profile_picture instanceof File) {
        updatedData.append('profile_picture', formData.profile_picture);
    }

    try {
        const response = await sendAuthenticatedRequest('https://climbing-app-2405933cdb44.herokuapp.com/api/auth/profile/edit/', 'PUT', updatedData);
        console.log('Profile updated:', response);
        navigate('/profile'); // Redirigir al perfil después de la actualización
    } catch (error) {
        console.error('Error updating profile:', error);
    }
  };

  return (
    <Wrapper>
      <BarraNavegacion />
      <br />
        <br />
        <br />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Label>Email</Label>
          <Input type="email" value={formData.email} readOnly />
          <Label>Name</Label>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
          <Label>Profile Picture</Label>
          <Input type="file" name="profile_picture" accept="image/*" onChange={handleChange} />
          {/* Enlace para cambiar la contraseña */}
          <PasswordChangeLink to="/profile/change-password">
            Change Password
          </PasswordChangeLink>
          <SubmitButton type="submit">Save Changes</SubmitButton>
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

const PasswordChangeLink = styled(Link)`
  margin-top: 15px;
  margin-bottom: 30px; /* Incrementa el espacio debajo del enlace */
  color: #005582;
  text-decoration: none;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

export default EditProfile;
