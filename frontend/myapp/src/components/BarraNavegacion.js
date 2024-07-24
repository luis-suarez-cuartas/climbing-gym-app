/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const headerStyles = css`
  position: fixed;
  background-color: #fff;
  margin: 0px auto 150px;
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 20px;
  z-index: 8;
`;

const navStyles = css`
  max-width: 1300px;
  color: #1a47ff;
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
    color: #1f2024;
    text-decoration: none;

    :hover {
      color: #1a47ff;
    }
  }
`;

const buttonStyles = css`
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-content: center;
  width: 300 px;
  a {
    border: 1px solid gray;
    width: 5rem;
    height: 1.8rem;
    border-radius: 8px;
    color: black;
    text-decoration: none;
    text-align: center;
    padding-top: 5px;
    :hover {
      background-color: #1f2024;
      color: white;
    }
  }

  #blue {
    color: white;
    background-color: #1a47ff;

    :hover {
      background-color: #1f2024;
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
            <img src="./abyssale-logo.svg" alt="logo" />
          </li>
          <li>
            <a href="./index.html">Product</a>
          </li>
          <li>
            <a href="./index.html">Solution</a>
          </li>
          <li>
            <a href="./index.html">Pricing</a>
          </li>
          <li>
            <a href="./index.html">Integration</a>
          </li>
          <li>
            <a href="./index.html">Resources</a>
          </li>
        </ul>
        <div css={buttonStyles}>
          <Link to="/login">Sign In</Link>
          <Link to="/register" id="blue">Sign out</Link>
        </div>
      </nav>
    </header>
  );
}
