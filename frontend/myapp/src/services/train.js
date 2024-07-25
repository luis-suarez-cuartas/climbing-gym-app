
import { sendAuthenticatedRequest } from './auth';
import { getAccessToken } from './auth';

export const getUnloadedSessions = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        throw new Error('No access token available');
    }

    try {
        const response = await fetch('/api/trainning/unloaded-trainings/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching unloaded sessions');
        }

        const data = await response.json();
        console.log('Unloaded sessions fetched:', data);  // Mensaje de consola
        return data;
    } catch (error) {
        console.error('Error fetching unloaded sessions:', error);
        throw error;
    }
};


export const loadSession = async (sessionId, data) => {
    try {
        const response = await sendAuthenticatedRequest(`/api/trainning/update-training/${sessionId}/`, 'PATCH', data);
        console.log('Session loaded successfully:', response);
        return response;
    } catch (error) {
        console.error('Error loading session:', error);
        throw error;
    }
};