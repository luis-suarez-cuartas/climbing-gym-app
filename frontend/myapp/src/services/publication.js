import { sendAuthenticatedRequest } from './auth';

export const createPublication = async (trainingId, isPublic) => {
    try {
        const response = await sendAuthenticatedRequest(
            'http://localhost:8000/api/publication/create/',
            'POST',
            { training_id: trainingId, is_public: isPublic }
        );
        console.log('Publication created successfully:', response);
        return response;
    } catch (error) {
        console.error('Error creating publication:', error);
        throw error;
    }
};


export const getPublicPublications = async () => {
    try {
        const response = await sendAuthenticatedRequest(
            'http://localhost:8000/api/publication/public/',
            'GET'
        );
        console.log('Public publications fetched successfully:', response);
        return response;
    } catch (error) {
        console.error('Error fetching public publications:', error);
        throw error;
    }
};



export const getUserPublications = async () => {
    try {
        const response = await sendAuthenticatedRequest(
            'http://localhost:8000/api/publication/user/',
            'GET'
        );
        console.log('User publications fetched successfully:', response);
        return response;
    } catch (error) {
        console.error('Error fetching user publications:', error);
        throw error;
    }
};

export const likePublication = async (publicationId) => {
    try {
        const response = await sendAuthenticatedRequest(
            `http://localhost:8000/api/publication/${publicationId}/like/`,
            'POST'
        );
        return response;
    } catch (error) {
        console.error('Error liking publication:', error);
        throw error;
    }
};
export const getTrainingDetails = async (training_id) => { // Cambia `trainingId` por `training_id`
    try {
      const response = await sendAuthenticatedRequest(
        `http://localhost:8000/api/training/${training_id}/details/`, // Cambia aquí también
        'GET'
      );
      return response;
    } catch (error) {
      console.error('Error fetching training details:', error);
      throw error;
    }
};
