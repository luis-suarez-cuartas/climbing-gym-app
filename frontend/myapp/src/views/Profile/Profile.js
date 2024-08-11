import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import LeftProfile from './LeftProfile';
import RightProfile from './RightProfile';
import MainProfile from './MainProfile';
import { BarraNavegacion } from '../../components/BarraNavegacion';

const GlobalStyle = createGlobalStyle`
  a {
    text-decoration: none !important;
    color: inherit;
  }

  a:hover {
    text-decoration: none !important;
    color: #FF6633 !important;
  }
`;

const Profile = () => {
  return (
    <Container>
      <GlobalStyle /> {/* Añade la regla global */}
      <BarraNavegacion />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Layout>
        <LeftProfile />
        <MainProfile />
        <RightProfile />
      </Layout>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 5px;
  max-width: 100%;
  font-family: Arial;
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(350px, 6fr) minmax(350px, 12fr) minmax(350px, 7fr);
  column-gap: 25px;
  row-gap: 0; /* Elimina cualquier espacio entre las filas */
  margin: 25px 10px;
  align-items: start; /* Alinea los elementos en la parte superior */
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

export default Profile;
