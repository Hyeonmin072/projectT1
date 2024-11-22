// src/axios/profileAPI.js
import axios from 'axios';
import { useAuth } from "../context/AuthContext";

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
    const response = await apiClient.get(`/profile/`, { 
      params: { userId } 
    });
    return response.data;
  },
  
  fetchUserVideos: async (userId) => {
    const response = await apiClient.get(`/profile/videos`, { 
      params: { userId } 
    });
    return response.data;
  },
  
  // 프로필 이미지 업로드
  uploadImage: async (formData) => {
    try {
        console.log('전송하는 formData:', formData);
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        
        const response = await apiClient.post('/profile/uploadImg', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        console.log('응답:', response);
        return response;
    } catch (error) {
        console.error('Error details:', error.response?.data || error);
        throw error;
    }
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