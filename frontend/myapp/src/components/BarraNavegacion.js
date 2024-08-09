/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';

const headerStyles = css`
  position: fixed;
  background-color: #000; /* Negro */
  width: 100%;
  padding: 20px 0; /* Aumentar el padding para hacer la barra más ancha */
  z-index: 8;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const navContainerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1300px;
  padding: 0 20px;
`;

const logoStyles = css`
  height: 100%; /* Ajustar la altura al 100% de la barra de navegación */
  max-height: 50px; /* Establecer una altura máxima para la imagen */
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
  color: #fff; /* Blanco */
  text-decoration: none;

  :hover {
    color: #1a47ff; /* Azul claro para el hover */
  }
`;

const buttonContainerStyles = css`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-left: auto; /* Empuja los botones a la derecha */
`;

const buttonStyles = css`
  border: 1px solid gray;
  width: 5rem;
  height: 1.8rem;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  padding-top: 5px;
  color: #fff; /* Color blanco por defecto */
  background-color: transparent;
  cursor: pointer;

  :hover {
    background-color: #1f2024;
    color: white;
  }

  &.signin {
    color: white; /* Blanco para Sign In */
    background-color: transparent;

    :hover {
      background-color: #1a47ff;
      color: white;
    }
  }
`;

export function BarraNavegacion() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header css={headerStyles}>
      <div css={navContainerStyles}>
        <ul css={ulStyles}>
          <li>
            <img src="imagenes/logo.png" alt="logo" css={logoStyles} />
          </li>
          <li>
            <Link to="/publications" css={linkStyles}>Publications</Link>
          </li>
          <li>
            <Link to="/profile" css={linkStyles}>Perfil</Link>
          </li>
          <li>
            <Link to="/entrenamiento" css={linkStyles}>Entrenamiento</Link>
          </li>
          <li>
            <Link to="/ranking" css={linkStyles}>Ranking</Link>
          </li>
          <li>
            <a href="./index.html" css={linkStyles}>Novedades</a>
          </li>
          <li>
            <a href="./index.html" css={linkStyles}>Servicio</a>
          </li>
        </ul>
        <div css={buttonContainerStyles}>
          <Link to="/login" css={buttonStyles} className="signin">Log In</Link>
          <button onClick={handleLogout} css={buttonStyles}>Log Out</button>
        </div>
      </div>
    </header>
  );
}
