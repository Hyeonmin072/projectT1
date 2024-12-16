// CommentsAxios.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http:/13.209.226.109:1111'
});

const handleError = (error) => {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
};

export const fetchComments = async (videoId) => {
    try {
        const response = await apiClient.get(`/${videoId}/comments`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// CommentsAxios.js
export const addComment = async (commentData) => {
    try {
        console.log('Request URL:', '/addComments');
        console.log('Request data:', commentData);
        
        const response = await apiClient.post('/addComments', {
            videoId: commentData.videoId,
            content: commentData.content,
            memberId: localStorage.getItem('userId'),
        });
        return response.data;
    } catch (error) {
        console.error('Error details:', error);
        handleError(error);
        throw error;
    }
};