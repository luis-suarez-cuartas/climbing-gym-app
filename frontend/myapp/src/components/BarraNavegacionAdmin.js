/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const headerStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000;
  width: 100%;
  height: 90px; /* Fija la altura para evitar cambios */
  padding: 0 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
`;

const navContainerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const logoContainerStyles = css`
  display: flex;
  align-items: center;
  height: 100%; /* Mantén la altura del contenedor del logo */
`;

const logoStyles = css`
  height: 50px; /* Fija la altura del logo */
  width: auto;
  max-width: 150px; /* Fija un ancho máximo */
  object-fit: contain; /* Asegura que el logo se ajuste al contenedor */
  vertical-align: middle;
`;

const navLinksContainerStyles = css`
  display: flex;
  justify-content: center;
  flex-grow: 1;
`;

const ulStyles = css`
  display: flex;
  list-style-type: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
  align-items: center;
`;

const linkStyles = css`
  height: 50px;
  line-height: 70px; /* Alinea verticalmente el texto de los enlaces */
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;

  :hover {
    color: #1a47ff;
  }
`;

const buttonContainerStyles = css`
  display: flex;
  align-items: center;
`;
const buttonStyles = css`
  border: 1px solid gray;
  width: 7rem; /* Aumenta el ancho del botón */
  height: 2.5rem;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #FF6633;
  cursor: pointer;

  :hover {
    background-color: #1f2024;
    color: white;
  }

  &.signin {
    color: white;
    background-color: #FF6633;
    border: 1px solid gray;

    :hover {
      background-color: #1f2024;
      color: white;
    }
  }
`;

export function BarraNavegacionAdmin() {
  return (
    <header css={headerStyles}>
      <div css={navContainerStyles}>
        <div css={logoContainerStyles}>
          <img 
            src="/imagenes/logo.png" 
            alt="logo" 
            css={logoStyles} 
           
          
          />
        </div>

        <div css={navLinksContainerStyles}>
          <ul css={ulStyles}>
            <li>
              <Link to="/publications" css={linkStyles}>Publications</Link>
            </li>
            <li>
              <Link to="/profile" css={linkStyles}>Perfil</Link>
            </li>
            <li>
              <Link to="/usuarios" css={linkStyles}>Entrenamiento</Link>
            </li>
            <li>
              <Link to="/ranking" css={linkStyles}>Ranking</Link>
            </li>
            <li>
              <a href="./index.html" css={linkStyles}>Usuarios</a>
            </li>
            <li>
              <a href="./index.html" css={linkStyles}>Home</a>
            </li>
          </ul>
        </div>

        <div css={buttonContainerStyles}>
          <ul css={ulStyles}>
            <li>
              <Link to="/admin/login" css={buttonStyles} className="adminSignin">Iniciar sesión</Link>
            </li>
            <li>
              <Link to="/admin/register" css={buttonStyles} className="adminRegister">Registrarse</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
