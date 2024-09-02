/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';

const headerStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000;
  width: 100%;
  padding: 20px 0;
  z-index: 1000;
  display: flex;
  align-items: center;
`;

const navContainerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  padding: 0 20px;
`;

const logoContainerStyles = css`
  display: flex;
  align-items: center;
`;

const logoStyles = css`
  max-height: 50px;
`;

const navLinksContainerStyles = css`
  display: flex;
  justify-content: center;
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
  color: #fff;
  text-decoration: none;

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
  width: 5rem;
  height: 1.8rem;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  display: inline-flex; /* Asegura alineación similar para ambos */
  justify-content: center;
  align-items: center;
  line-height: 1; /* Asegura que la altura de línea no afecte */
  padding: 0; /* Remueve padding adicional que podría causar diferencias */
  color: #fff;
  background-color: #FF6633;
  cursor: pointer;

  :hover {
    background-color: #1f2024;
    color: white;
  }

  &.signin {
    color: white;
    background-color: #FF6633; /* Asegura que también sea naranja */
    border: 1px solid gray;

    :hover {
      background-color: #1f2024;
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
        {/* Div para el logo alineado a la izquierda */}
        <div css={logoContainerStyles}>
          <img src="/static/imagenes/logo.png" alt="logo" css={logoStyles} />
        </div>

        {/* Div para los enlaces de navegación alineados al centro */}
        <div css={navLinksContainerStyles}>
          <ul css={ulStyles}>
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
              <a href="./index.html" css={linkStyles}>Home</a>
            </li>
          </ul>
        </div>

        {/* Div para los botones alineados a la derecha */}
        <div css={buttonContainerStyles}>
          <ul css={ulStyles}>
            <li>
              <Link to="/login" css={buttonStyles} className="signin">Log In</Link>
            </li>
            <li>
              <button onClick={handleLogout} css={buttonStyles}>Log Out</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
