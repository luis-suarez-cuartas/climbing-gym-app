import React, { useState } from 'react';
import { storeTokens,loginRequest } from '../services/auth';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

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
        loginRequest('http://localhost:8000/api/auth/login/', formData)
            .then(data => {
                storeTokens(data);  // Store tokens received from backend
                console.log('Login successful:', data);
                // Optionally redirect the user to another page
            })
            .catch(error => {
                console.error('Login error:', error);
                setError('Failed to login. Please check your credentials.');
            });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                {error && <p>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
