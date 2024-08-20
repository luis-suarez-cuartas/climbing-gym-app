
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAdmin } from '../services/admin';
import { BarraNavegacionAdmin } from '../components/BarraNavegacionAdmin';  

function AdminRegister() {
    const [formData, setFormData] = useState({
        name: '',
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
            const result = await registerAdmin(formData);
            console.log('New admin registered successfully:', result);
            navigate('/admin/homePage'); 
        } catch (error) {
            console.error('Admin registration error:', error);
            setError('Failed to register admin. Please try again.');
        }
    };

  return (
    <div className="container">
       <BarraNavegacionAdmin />
      <div className="container-register">
        <div className="wrap-register">
          <form className="register-form" onSubmit={handleSubmit}>
            <span className="register-form-title">Create Admin Account</span>
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
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default AdminRegister;