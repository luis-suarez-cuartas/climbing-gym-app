import { sendAuthenticatedRequest } from './auth';
import { getAccessToken } from './auth';

export const getUnloadedSessions = async () => {
    const accessToken = getAccessToken();
    console.log('Access Token:', accessToken); 

    if (!accessToken) {
        throw new Error('No access token available');
    }

    try {
        const response = await fetch('http://localhost:8000/api/training/unloaded-trainings/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('Response status:', response.status); 

        if (!response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('text/html')) {
                const text = await response.text();
                console.error('HTML response received:', text);
                throw new Error('Error fetching unloaded sessions: received HTML response instead of JSON');
            }
            throw new Error('Error fetching unloaded sessions');
        }

        const data = await response.json();
        console.log('Unloaded sessions fetched:', data); // Verifica los datos recibidos
        return data;
    } catch (error) {
        console.error('Error fetching unloaded sessions:', error); // Verifica cualquier error
        throw error;
    }
};


export const loadSession = async (sessionId, data) => {
    try {
        const response = await sendAuthenticatedRequest(
            `http://localhost:8000/api/training/update-training/${sessionId}/`, 
            'PATCH',  // Especificar que se debe usar el método PATCH
            data
        );
        console.log('Session loaded successfully:', response);
        return response;
    } catch (error) {
        console.error('Error loading session:', error);
        throw error;
    }
};
