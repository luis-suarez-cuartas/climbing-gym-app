import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/register.css';
import { BarraNavegacion } from '../components/BarraNavegacion';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
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
    try {
      const response = await fetch('http://localhost:8000/api/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Registration failed');
      const result = await response.json();
      console.log('Registration successful:', result);
      navigate('/');  // Redirect to home page
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="container">
       <BarraNavegacion />
      <div className="container-register">
        <div className="wrap-register">
          <form className="register-form" onSubmit={handleSubmit}>
            <span className="register-form-title">Create an Account</span>
            <br />
            <br />
            <div className="wrap-input">
              <input
                className={formData.name !== '' ? "has-val input" : "input"}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <span className="focus-input" data-placeholder="Name"></span>
            </div>
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

            <div className="container-register-form-btn">
              <button className="register-form-btn" type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
