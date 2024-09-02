export const storeTokens = ({ access, refresh }, user) => {
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    
    // Asegurarse de que el usuario es válido antes de almacenarlo
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        console.log('User stored:', user);
    } else {
        console.error('No user data provided to storeTokens');
    }
};

export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

export const getUser = () => {
    const user = localStorage.getItem('user');
    console.log('Retrieved user from localStorage:', user); // Log para verificar qué se obtiene
    return user ? JSON.parse(user) : null; // Asegúrate de devolver un objeto o null si no existe
};

export const isAdmin = () => {
    const user = getUser();
    return user && user.is_superuser; // Verifica si el usuario es un superusuario
};

export const sendAuthenticatedRequest = (url, method = 'GET', data = null) => { 
    const accessToken = getAccessToken();
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
    };

    if (!(data instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    const options = {
        method: method,
        headers: headers,
    };

    if (method !== 'GET' && data) {
        options.body = data instanceof FormData ? data : JSON.stringify(data);
    }

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.detail || 'Request failed');
                });
            }
            if (response.status === 204) {
                return null;
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

export const adminLoginRequest = async (data) => {
    const response = await fetch('/api/auth/admin/login/', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Admin login failed');
    }

    const result = await response.json();

    // Verifica que el resultado contenga el usuario
    if (result.access && result.refresh && result.email) {
        storeTokens({
            access: result.access,
            refresh: result.refresh
        }, {
            email: result.email,
            name: result.name,
            is_superuser: result.is_superuser,
            is_staff: result.is_staff,
        });
    } else {
        console.error('Admin login successful but user data is incomplete:', result);
    }

    return result;
};

export const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');
    if (refreshToken) {
        const response = await fetch('/api/auth/logout/', {
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
    localStorage.removeItem('user'); // Elimina también los datos del usuario
};
