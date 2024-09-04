import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { sendAuthenticatedRequest, logout } from '../../services/auth';

const LeftProfile = () => {
  const [user, setUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await sendAuthenticatedRequest('/api/auth/profile/', 'GET');
        setUser(response);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    navigate('/profile/edit');
  };

  const handleSettingsClick = () => {
    console.log('Ajustes clicked');
  };

  const handleChangePasswordClick = () => {
    navigate('/profile/change-password');
  };

  const handleDeleteAccountClick = () => {
    setIsModalVisible(true); // Mostrar el modal
  };

  const handleAcceptDelete = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const accessToken = localStorage.getItem('accessToken');

        // Logout (esto revoca el refresh token)
        await fetch('/api/auth/logout/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });
       
        await sendAuthenticatedRequest('/api/auth/delete-account/', 'DELETE');

        // Limpiar los tokens locales
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        
        // Redirigir al usuario a la página de inicio de sesión
        navigate('/login');
    } catch (error) {
        console.error('Error eliminando la cuenta:', error);
    } finally {
        setIsModalVisible(false);
    }
};


  const handleRejectDelete = () => {
    setIsModalVisible(false); // Ocultar el modal
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <ArtCard>
        <UserInfo>
          <CardBackground />
          <h1>
            <Photo style={{ backgroundImage: `url(${user.profile_picture.split('/').pop()})` }} />
            <NameCard>{user.name}</NameCard>
          </h1>
          <a href="#">
            <LinkCard>{user.email}</LinkCard>
          </a>
        </UserInfo>
        <Widget>
          <EditarButton onClick={handleEditClick}>Editar</EditarButton>
        </Widget>
      </ArtCard>

      <SettingsSection>
        <SettingsItem onClick={handleSettingsClick}>
          <SettingsIcon src="/imagenes/ajustes.png" alt="Icono de ajustes" />
          Ajustes
        </SettingsItem>
        <SettingsItem onClick={handleChangePasswordClick}>
          Cambiar Contraseña
        </SettingsItem>
        <SettingsItem onClick={handleDeleteAccountClick}>
          Eliminar Cuenta
        </SettingsItem>
      </SettingsSection>

      {/* Modal para confirmar la eliminación de la cuenta */}
      {isModalVisible && (
        <ModalOverlay>
          <ModalContent>
            <ModalMessage>¿Está seguro de que desea eliminar su cuenta?</ModalMessage>
            <ModalButtons>
              <ModalButton onClick={handleAcceptDelete} primary>Aceptar</ModalButton>
              <ModalButton onClick={handleRejectDelete}>Rechazar</ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

const Container = styled.div`
  grid-area: leftside;
`;

const ArtCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border: 1.5px solid #FF6633;
  border-radius: 6px;
  transition: box-shadow 83ms;
  position: relative;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 0 0 rgb(0, 0, 0, 0.20);
`;

const UserInfo = styled.div`
  border-bottom: 2px solid rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
  word-wrap: break-word;
  word-break: break-word;
`;

const CardBackground = styled.div`
  background: url("/images/OIP.jpeg");
  background-position: center;
  background-size: 482px;
  height: 224px;
  margin: -12px -12px 0;
`;

const Photo = styled.div`
  box-shadow: none;
  width: 150px;
  height: 150px;
  box-sizing: border-box;
  background-clip: content-box;
  background-color: white;
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
  border: 3px solid black;
  margin: -38px auto 12px;
  border-radius: 50%;
`;

const NameCard = styled.div`
  font-family: Arial;
  font-size: 24px;
  font-weight: bold;
  color: #000;
  line-height: 1.5;
`;

const LinkCard = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #000;
`;

const Widget = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  color: #808080;
  margin-left: 10px;
`;

const EditarButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #FF6633;
  color: white;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #005582;
    color: white;
  }
`;

// Nueva sección de ajustes
const SettingsSection = styled.div`
  margin-top: 20px;
  border: 1.5px solid #FF6633;
  border-radius: 6px;
`;

const SettingsItem = styled.div`
  padding: 20px;
  border-bottom: 1px solid #FF6633;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #FF6633;
    color: white;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const SettingsIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ModalMessage = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: ${props => (props.primary ? '#FF6633' : '#cccccc')};
  color: white;

  &:hover {
    background-color: ${props => (props.primary ? '#d9541e' : '#b3b3b3')};
  }
`;
export default LeftProfile;
