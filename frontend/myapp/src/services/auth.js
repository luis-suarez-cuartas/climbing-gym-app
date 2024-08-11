
export const storeTokens = ({ access, refresh }) => {
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
};

export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};
export const sendAuthenticatedRequest = (url, method = 'GET', data = null) => { 
    const accessToken = getAccessToken();
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
    };

    // Solo establecemos el 'Content-Type' si los datos no son de tipo FormData
    if (!(data instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    const options = {
        method: method,
        headers: headers,
    };

    if (method !== 'GET' && data) {
        // Si los datos son de tipo FormData, los pasamos directamente como cuerpo
        options.body = data instanceof FormData ? data : JSON.stringify(data);
    }

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.detail || 'Request failed');
                });
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error with fetch:', error);
            throw error;
        });
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
