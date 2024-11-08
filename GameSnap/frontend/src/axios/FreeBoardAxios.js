// FreeBoardAxios.js
/* eslint-disable */
import axios from 'axios';

// 기본 URL 설정
const BASE_URL = 'http://localhost:1111'; // 백엔드 서버 URL


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true ,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true // CORS 인증 설정
});

axiosInstance.interceptors.request.use(
  config => {
    console.log('요청 URL:', config.url);
    console.log('요청 헤더:', config.headers);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    console.log('응답 데이터:', response.data);
    return response;
  },
  error => {
    console.error('에러 상세:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: error.config
    });
    return Promise.reject(error);
  }
);

const FreeBoardAxios = {
  // Game 엔티티 관련 요청
  async getGames() {
    try {
      const response = await axiosInstance.get('/game');
      console.log('게임 목록:', response.data);
      return response.data;
    } catch (error) {
      console.error('게임 목록 조회 실패:', error);
      throw error;
    }
  },

  // Board 엔티티 관련 요청
  async getPosts(gameId) {
    try {
      // URL을 Path Variable 형식으로 수정
      const response = await axiosInstance.get(`/board/${gameId}`);
      console.log('게시글 목록:', response.data);
      return response.data;
    } catch (error) {
      console.error('게시글 목록 조회 실패:', error);
      throw error;
    }
  },

  // 게시글 작성
  async createPost(postData) {
    try {
      const response = await axios.post(`${BASE_URL}/post`, postData);
      return response.data;
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      throw error;
    }
  },

  // 게시글 상세 조회
  async getPostDetail(postId) {
    try {
      const response = await axios.get(`${BASE_URL}/post/${postId}`);
      return response.data;
    } catch (error) {
      console.error('게시글 상세 조회 실패:', error);
      throw error;
    }
  },

  // 게시글 수정
  async updatePost(postId, postData) {
    try {
      const response = await axios.put(`${BASE_URL}/post/${postId}`, postData);
      return response.data;
    } catch (error) {
      console.error('게시글 수정 실패:', error);
      throw error;
    }
  },

  // 게시글 삭제
  async deletePost(postId) {
    try {
      const response = await axios.delete(`${BASE_URL}/post/${postId}`);
      return response.data;
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      throw error;
    }
  },

  // 게시글 검색
  async searchPosts(gameGenre, searchTerm) {
    try {
      const response = await axios.get(`${BASE_URL}/post/search`, {
        params: {
          gameGenre,
          searchTerm
        }
      });
      return response.data;
    } catch (error) {
      console.error('게시글 검색 실패:', error);
      throw error;
    }
  },

  // 조회수 증가
  async incrementViews(postId) {
    try {
      const response = await axios.put(`${BASE_URL}/post/${postId}/views`);
      return response.data;
    } catch (error) {
      console.error('조회수 증가 실패:', error);
      throw error;
    }
  }

  
};

export default FreeBoardAxios;