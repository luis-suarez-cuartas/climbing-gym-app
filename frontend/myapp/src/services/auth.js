
export const storeTokens = ({ access, refresh }) => {
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
};

export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

export const sendAuthenticatedRequest = (url, data) => {
    const accessToken = getAccessToken();
    return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => console.error('Error with fetch:', error));
};

export const loginRequest = (url, data) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => console.error('Error with fetch:', error));
};

export const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');
    if (refreshToken) {
        const response = await fetch('http://localhost:8000/api/auth/logout/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Logout failed:', errorText);
        }

    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};
