import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { sendAuthenticatedRequest } from '../../services/auth'; // Asegúrate de importar la función correctamente

const LeftProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await sendAuthenticatedRequest('http://localhost:8000/api/auth/profile/', 'GET');
        setUser(response);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <ArtCard>
        <UserInfo>
          <CardBackground />
          <h1>
            <Photo style={{ backgroundImage: `url(http://localhost:8000${user.profile_picture})` }} />
            <NameCard>{user.name}</NameCard>
          </h1>
          <a href="#">
            <LinkCard>{user.email}</LinkCard>
          </a>
        </UserInfo>
        <Widget>
          <EditarButton>Editar</EditarButton>
        </Widget>
      </ArtCard>
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

export default LeftProfile;
