
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:1111/video', // 백엔드 URL
});

const handleError = (error) => {
    console.error("API 요청 중 오류 발생:", error);
    throw error; // 호출된 곳에서 에러를 핸들링할 수 있도록 전달
};

// 기존의 기능들
export const ToggleLike = async (videoId, memberId) => {
    try {
        const response = await apiClient.post(`/${videoId}/like-status`, {
            userId: memberId,
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getPreferenceRandomVideo = async (likeGamesId, userId) => {
    console.log("likeGamesId:",likeGamesId,);
    console.log("userId:",userId);
    try {
        const response = await apiClient.post('/preferenceRandom', {
            gamesId: likeGamesId,
            memberId: userId,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getRandomVideo = async (userId) => {
    try {
        console.log('유저아이디 : ', userId);
        const response = await apiClient.post('/random', {
            memberId: userId,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getComment = async (videoId) => {
    try {
        const response = await apiClient.get(`/${videoId}/comments`); // 해당 영상의 댓글 조회
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const addComment = async (commentData) => {
    try {
        const response = await apiClient.post('/addComments', commentData);  // 해당 영상의 댓글 추가
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// 파일 업로드 기능 추가
export const uploadFile = async (file,userId) => {
    const formData = new FormData();
    formData.append('file', file);  // 파일을 FormData에 첨부
    formData.append('userId', userId);
    console.log("userId:",userId);
    console.log("formData:",formData.values);
    try {
        const response = await apiClient.post('/upload', formData);
        console.log("파일 보낸후");
        return response.data;  // 서버에서 반환된 파일 URL 등을 반환
    } catch (error) {
        handleError(error);
    }
};

export default {
    ToggleLike,
    getRandomVideo,
    getComment,
    addComment,
    getPreferenceRandomVideo,
    uploadFile,  // 추가된 uploadFile 내보내기
};
