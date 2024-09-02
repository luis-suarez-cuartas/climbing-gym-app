// services/ranking.js

import { sendAuthenticatedRequest } from './auth'; // Asegúrate de que esta importación esté correcta

export const getUserRankings = async () => {
    try {
        const response = await sendAuthenticatedRequest(
            '/api/ranking/user-rankings/', // Ajusta esta URL si es necesario
            'GET'
        );
        console.log('User rankings fetched successfully:', response);
        return response;
    } catch (error) {
        console.error('Error fetching user rankings:', error);
        throw error;
    }
};


export const getMostTrainings = async () => {
    try {
        const response = await sendAuthenticatedRequest(
            '/api/ranking/most-trainings/',
            'GET'
        );
        return response;
    } catch (error) {
        console.error('Error fetching MostTrainings rankings:', error);
        throw error;
    }
};

export const getMostClimbedRoutes = async () => {
    try {
        const response = await sendAuthenticatedRequest(
            '/api/ranking/most-climbed-routes/',
            'GET'
        );
        return response;
    } catch (error) {
        console.error('Error fetching MostClimbedRoutes rankings:', error);
        throw error;
    }
};

export const getTotalTrainingTime = async () => {
    try {
        const response = await sendAuthenticatedRequest(
            '/api/ranking/total-training-time/',
            'GET'
        );
        return response;
    } catch (error) {
        console.error('Error fetching TotalTrainingTime rankings:', error);
        throw error;
    }
};

export const getMostPopularPublications = async () => {
    try {
        const response = await sendAuthenticatedRequest(
            '/api/ranking/most-popular-publications/',
            'GET'
        );
        return response;
    } catch (error) {
        console.error('Error fetching MostPopularPublications rankings:', error);
        throw error;
    }
};

export const getMostLikes = async () => {
    try {
        const response = await sendAuthenticatedRequest(
            '/api/ranking/most-likes/',
            'GET'
        );
        return response;
    } catch (error) {
        console.error('Error fetching MostLikes rankings:', error);
        throw error;
    }
};
