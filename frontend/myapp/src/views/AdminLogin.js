// views/AdminLogin.js

import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeTokens, loginRequest } from '../services/auth';
import { BarraNavegacion } from '../components/BarraNavegacion';
import '../assets/css/login.css';

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const data = await loginRequest('http://localhost:8000/api/auth/admin/login/', formData);
      console.log('Admin login successful:', data);
      storeTokens(data);
      navigate('/admin/dashboard');  // Redirect to admin dashboard
    } catch (error) {
      console.error('Admin login error:', error);
      setError('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="container">
      <BarraNavegacion />
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" onSubmit={handleSubmit}>
            <span className="login-form-title">Admin Login</span>
            <br />
            <br />
            <div className="wrap-input">
              <input
                className={formData.email !== '' ? "has-val input" : "input"}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="focus-input" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input">
              <input
                className={formData.password !== '' ? "has-val input" : "input"}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="focus-input" data-placeholder="Password"></span>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn" type="submit">Login</button>
            </div>

            {error && <p className="error-text">{error}</p>}

            <div className="text-center">
              <span className="txt1">Don't have an account?</span>
              <Link className="txt2" to="/admin/register">Create an admin account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;