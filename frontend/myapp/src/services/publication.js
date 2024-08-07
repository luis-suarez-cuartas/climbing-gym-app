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

