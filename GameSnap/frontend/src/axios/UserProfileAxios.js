// src/axios/profileAPI.js
import axios from 'axios';

const BASE_URL = "http://localhost:1111";

// API 클라이언트 인스턴스 생성
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// 인증 토큰이 필요한 요청을 위한 인터셉터
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export const profileAPI = {

  fetchUserProfile: async (userId) => {
    return await apiClient.get(`/profile/uploadImg`, { params: { userId } });
  },

  fetchUserVideos: async (userId) => {
    return await apiClient.get(`/profile/uploadImg/videos`, { params: { userId } });
  },
  // 프로필 이미지 업로드
  uploadImage: async (formData) => {
    return await apiClient.post('/profile/uploadImg', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  },

  // 프로필 이미지 삭제
  deleteImage: async (userId) => {
    return await apiClient.delete(`/profile/deleteImg/${userId}`);
  },

  // 프로필 내용 업데이트
  updateContent: async (content, userId) => {
    return await apiClient.post('/profile/updateContent', {
      content,
      userId
    });
  },

  // 프로필 이름 업데이트
  updateName: async (userName, userId) => {
    return await apiClient.post('/profile/updateName', {
      userName,
      userId
    });
  }
};

export default profileAPI;