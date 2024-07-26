import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { css,Global } from '@emotion/react';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
  }
`;
root.render(
  <React.StrictMode>
    <Global css={globalStyles} />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
