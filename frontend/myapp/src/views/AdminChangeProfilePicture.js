import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { sendAuthenticatedRequest } from '../services/auth';
import { BarraNavegacionAdmin } from '../components/BarraNavegacionAdmin';

const AdminChangeProfilePicture = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('profile_picture', selectedFile);

        try {
            const response = await sendAuthenticatedRequest('http://localhost:8000/api/auth/admin/change-profile-picture/', 'PUT', formData);
            console.log('Profile picture updated:', response);
            navigate('/admin/profile'); // Redirigir al perfil después de actualizar la foto
        } catch (error) {
            console.error('Error updating profile picture:', error);
        }
    };

    return (
        <Wrapper>
            <BarraNavegacionAdmin />
            <br />
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Label>Cambiar Foto de Perfil</Label>
                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                    {preview && <ImagePreview src={preview} alt="Profile Preview" />}
                    <ButtonContainer>
                        <SubmitButton type="submit">Aceptar</SubmitButton>
                        <CancelButton type="button" onClick={() => navigate('/admin/profile')}>Rechazar</CancelButton>
                    </ButtonContainer>
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

const ImagePreview = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 2px solid #FF6633;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
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

const CancelButton = styled.button`
  padding: 12px 24px;
  background-color: #ccc;
  color: black;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    background-color: #999;
  }
`;

export default AdminChangeProfilePicture;
