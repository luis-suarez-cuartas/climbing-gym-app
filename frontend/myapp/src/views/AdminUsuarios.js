import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getUsers } from '../services/admin';
import { BarraNavegacionAdmin } from '../components/BarraNavegacionAdmin';  
import { Link } from 'react-router-dom';

const AdminUsuarios = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('AdminUsuarios component mounted');
    
    const fetchUsers = async () => {
      try {
        console.log('Fetching users...');
        const data = await getUsers();
        console.log('Users fetched:', data);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container>
      <BarraNavegacionAdmin />
      <ContentWrapper>
        <SearchBar>
          <SearchInput type="text" placeholder="Buscar usuarios..." />
          <SearchButton type="button">🔍</SearchButton>
        </SearchBar>

        <UsersList>
          {users.map(user => (
            <UserItem key={user.id}>
              <UserInfo>
                <UserAvatar
                  src={user.profile_picture ? `http://localhost:8000${user.profile_picture}` : '/imagenes/default_profile.jpg'}
                  alt={`${user.name}'s profile`}
                />
                <UserName>{user.name}</UserName>
              </UserInfo>
              <UserActions>
                <ActionLink to={`/admin/users/${user.id}/view`} color="blue">Ver</ActionLink>
                <ActionLink to={`/admin/users/${user.id}/delete`} color="red">Eliminar</ActionLink>
              </UserActions>
            </UserItem>
          ))}
        </UsersList>
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

const ActionLink = styled(Link)`
  margin-left: 10px;
  font-weight: bold;
  color: ${props => props.color};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default AdminUsuarios;
