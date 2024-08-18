
import { getAccessToken } from './auth';

export const registerAdmin = async (formData) => {
    const token = getAccessToken();

    if (!token) {
        throw new Error('No access token available');
    }

    const response = await fetch('http://localhost:8000/api/auth/admin/register/', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,  // Incluye el token en la cabecera
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Admin registration failed');
    }

    return await response.json();
};