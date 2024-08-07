import { sendAuthenticatedRequest } from './auth';

export const createPublication = async (trainingId) => {
    try {
        const response = await sendAuthenticatedRequest(
            'http://localhost:8000/api/publication/create/',
            'POST',
            { training_id: trainingId }
        );
        console.log('Publication created successfully:', response);
        return response;
    } catch (error) {
        console.error('Error creating publication:', error);
        throw error;
    }
};
