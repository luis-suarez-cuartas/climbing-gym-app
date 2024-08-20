import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BarraNavegacionAdmin } from '../components/BarraNavegacionAdmin';

const AdminAjustes = () => {

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Wrapper>
      <BarraNavegacionAdmin />
      <br />
      <Container>
        <Section>
          <Title>AJUSTES</Title>
        </Section>
        <Section>
          <Option onClick={() => handleNavigation('/admin/change-password')}>
            Cambiar Contraseña
          </Option>
        </Section>
        <Section>
          <Option onClick={() => handleNavigation('/admin/register')}>
            Añadir administrador
          </Option>
        </Section>
        <Section>
        <Option onClick={() => handleNavigation('/admin/change-profile-picture')}>
            Actualizar foto de perfil
          </Option>
        </Section>
        <Section>
          <Option>Actividad</Option>
        </Section>
        <Section>
          <Option>Privacidad</Option>
        </Section>
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
  max-width: 1100px;
  margin: 50px auto;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  border: 3px solid #FF6633;
  padding: 40px;
  margin: 20px 0;
`;

const Title = styled.h2`
  font-size: 24px;
  color: Black;
  text-align: center;
`;

const Option = styled.div`
  font-size: 20px;
  color: black;
  text-align: center;
`;

export default AdminAjustes;
