
import axios from 'axios';


const apiClient = axios.create({
<<<<<<< HEAD
    baseURL: 'http://localhost:1111/video', // 백엔드 URL
=======
    baseURL: 'http://3.37.183.85:1111', // 백엔드 URL
>>>>>>> parent of 4471937 (프론트 주소 누락 수정)
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
export const uploadFile = async (formData) => {
    console.log('uploadFile 보내는중');
    try {
        const response = await apiClient.post('/upload', formData);
        console.log("파일 보낸후");
        return response.data;  // 서버에서 반환된 파일 URL 등을 반환
    } catch (error) {
        handleError(error);
    }
};

export const saveVideoDetails = async (videoData) => {

    const formData = new FormData();
    console.log("받은 비디오 데이터:", videoData);
    //요청
    formData.append('title', videoData.title);
    formData.append('desc', videoData.description);
    formData.append('gameId', videoData.gameId);
    formData.append('userId', videoData.userId);
    formData.append('title', videoData.title);
    formData.append('file', videoData.file);

    console.log('=서버로 보내는 폼데이터 내용=');
    for (let [key, value] of formData.entries()) {
        console.log(key + ': ' + value);
    }
    
    const response = await apiClient.post('/video/upload', formData);
    return response.data;
  };

export default {
    ToggleLike,
    getRandomVideo,
    getComment,
    addComment,
    getPreferenceRandomVideo,
    uploadFile,  // 추가된 uploadFile 내보내기
};
