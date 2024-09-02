import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getUsers } from '../services/admin';
import { sendAuthenticatedRequest } from '../services/auth';
import { BarraNavegacionAdmin } from '../components/BarraNavegacionAdmin';
import { Link, useNavigate } from 'react-router-dom';

const AdminUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        console.log('Users loaded:', data);  // Verifica que los datos se carguen correctamente
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteClick = (userId) => {
    if (!userId) {
      console.error('User ID is undefined or null');
      return;
    }

    console.log(`User ID to delete: ${userId}`);
    setSelectedUserId(userId);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUserId === null) {
      console.error('User ID is undefined or null');
      return;
    }
    try {
      await sendAuthenticatedRequest(`/api/auth/admin/users/${selectedUserId}/delete/`, 'DELETE');
      setUsers(users.filter(user => user.id !== selectedUserId));
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setIsModalVisible(false);
      setSelectedUserId(null);
    }
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
    setSelectedUserId(null);
  };

  const handleViewProfile = (userId) => {
    navigate(`/admin/users/${userId}/profile`);  // Redirigir a la página de perfil del usuario
  };

  return (
    <Container>
      <BarraNavegacionAdmin />
      <ContentWrapper>
        <SearchBar>
          <SearchInput type="text" placeholder="Buscar usuarios..." />
          <SearchButton type="button">🔍</SearchButton>
        </SearchBar>

        <UsersList>
          {users.map(user => {
            if (!user.id) {
              console.error(`User without ID found: ${JSON.stringify(user)}`);
              return null;  // Salta los usuarios sin ID
            }
            return (
              <UserItem key={user.id}>
                <UserInfo>
                  <UserAvatar
                    src={user.profile_picture ? `${user.profile_picture}` : '/imagenes/default_profile.jpg'}
                    alt={`${user.name}'s profile`}
                  />
                  <UserName>{user.name}</UserName>
                </UserInfo>
                <UserActions>
                  <ActionLink onClick={() => handleViewProfile(user.id)} color="blue">Ver</ActionLink>
                  <DeleteLink onClick={() => handleDeleteClick(user.id)} color="red">Eliminar</DeleteLink>
                </UserActions>
              </UserItem>
            );
          })}
        </UsersList>

        {isModalVisible && (
          <ModalOverlay>
            <ModalContent>
              <ModalMessage>¿Está seguro de que desea eliminar este usuario?</ModalMessage>
              <ModalButtons>
                <ModalButton primary onClick={handleConfirmDelete}>Aceptar</ModalButton>
                <ModalButton onClick={handleCancelDelete}>Rechazar</ModalButton>
              </ModalButtons>
            </ModalContent>
          </ModalOverlay>
        )}
      </ContentWrapper>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
`;

const ContentWrapper = styled.div`
  margin-top: 90px; /* Asegúrate de que hay suficiente espacio para la barra de navegación */
  border: 2px solid orange;
  border-radius: 10px;
  padding: 20px;
  background-color: #fff;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 2px solid orange;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 85%;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SearchButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: orange;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
`;

const UsersList = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid orange;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  border: 2px solid orange;
`;

const UserName = styled.span`
  font-weight: bold;
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
`;

const ActionLink = styled.span`
  margin-left: 10px;
  font-weight: bold;
  color: blue;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const DeleteLink = styled.span`
  margin-left: 10px;
  font-weight: bold;
  color: red;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
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

export default AdminUsuarios;
