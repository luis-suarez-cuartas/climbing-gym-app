/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const headerStyles = css`
  position: fixed;
  background-color: #000; /* Negro */
  margin: 0px auto 150px;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px 0; /* Aumentar el padding para hacer la barra más ancha */
  z-index: 8;
`;

const logoStyles = css`
  height: 100%; /* Ajustar la altura al 100% de la barra de navegación */
  max-height: 50px; /* Establecer una altura máxima para la imagen */
`;

const navStyles = css`
  max-width: 1300px;
  color: #fff; /* Blanco */
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  margin: auto 0;
  align-content: center;
  width: 100%;

  ul {
    display: flex;
    list-style-type: none;
    gap: 2rem;
    margin-top: 5px;
  }

  a {
    height: 50px;
    color: #fff; /* Blanco */
    text-decoration: none;

    :hover {
      color: #1a47ff; /* Azul claro para el hover */
    }
  }
`;

const buttonStyles = css`
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-content: center;
  width: 300px;
  
  a {
    border: 1px solid gray;
    width: 5rem;
    height: 1.8rem;
    border-radius: 8px;
    text-decoration: none;
    text-align: center;
    padding-top: 5px;
    color: #fff; /* Color blanco por defecto */
    
    :hover {
      background-color: #1f2024;
      color: white;
    }
  }

  #signout {
    color: white;
    background-color: #000; /* Negro para Sign Out */

    :hover {
      background-color: #1f2024;
      color: white;
    }
  }

  #signin {
    color: white; /* Blanco para Sign In */
    background-color: transparent;

    :hover {
      background-color: #1a47ff;
      color: white;
    }
  }
`;

export function BarraNavegacion() {
  return (
    <header css={headerStyles}>
      <nav css={navStyles}>
        <ul>
          <li>
            <img src="imagenes/logo.png" alt="logo"  css={logoStyles} />
          </li>
          <li>
            <a href="./index.html">Vías</a>
          </li>
          <li>
            <Link to="/profile">Perfil</Link> 
          </li>
          <li>
            <a href="./index.html">Ranking</a>
          </li>
          <li>
            <a href="./index.html">Novedades</a>
          </li>
          <li>
            <a href="./index.html">Servicio</a>
          </li>
        </ul>
        <div css={buttonStyles}>
          <Link to="/login" id="signin">Sign In</Link>
          <Link to="/register" id="signout">Sign Out</Link>
        </div>
      </nav>
    </header>
  );
}
