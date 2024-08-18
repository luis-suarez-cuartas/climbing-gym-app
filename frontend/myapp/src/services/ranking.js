// services/ranking.js

import { sendAuthenticatedRequest } from './auth'; // Asegúrate de que esta importación esté correcta

export const getUserRankings = async () => {
    try {
        const response = await sendAuthenticatedRequest(
            'http://localhost:8000/api/ranking/user-rankings/', // Ajusta esta URL si es necesario
            'GET'
        );
        console.log('User rankings fetched successfully:', response);
        return response;
    } catch (error) {
        console.error('Error fetching user rankings:', error);
        throw error;
    }
};
