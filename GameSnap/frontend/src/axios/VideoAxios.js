import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:1111/video',
});

const handleError = (error) => {
    console.error("API 요청 중 오류 발생:", error);
    throw error; // 호출된 곳에서 에러를 핸들링할 수 있도록 전달
};

export const getVideo = async (likeGamesId) => {
    try {
        const response = await apiClient.post('/random',{
            gamesId: likeGamesId
        });   //UserPage로딩하면 랜덤으로 비디오 요청
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getComment = async (videoId) => {
    try {
        const response = await apiClient.get(`/${videoId}/comments`);   //해당 영상의 댓글 조회
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const addComment = async (commentData) => {
    try {
        const response = await apiClient.post('/addComments', commentData);  //해당 영상의 댓글 추가 
        return response.data;
    } catch (error) {
        handleError(error);
    }

};
export default {
    getVideo,
    getComment,
    addComment,
};