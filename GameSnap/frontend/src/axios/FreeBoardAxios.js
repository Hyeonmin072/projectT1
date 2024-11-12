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
    // console.log('응답 데이터:', response.data);
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
      // console.log('게임 목록:', response.data);
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
      const response = await axiosInstance.get(`/boardList/${gameId}`);
      console.log('게시글 목록:', response.data);
      return response.data;
    } catch (error) {
      console.error('게시글 목록 조회 실패:', error);
      throw error;
    }
  },

  // 게시글 작성
  async createPost(formData) {
    try {
      const data = await axios.post(`${BASE_URL}/board/write`, formData, {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
        }
      });
      console.log('게시글이 성공적으로 저장되었습니다.', data)
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      throw error;
    }
  },

  // 게시글 상세 조회
  async getPostDetail(postId) {
    try {
      const response = await axios.get(`${BASE_URL}/board/${postId}`);
      return response.data;
    } catch (error) {
      console.error('게시글 상세 조회 실패:', error);
      throw error;
    }
  },


  // 게시글 수정
  async updatePost(postId, postData) {
    try {
      console.log('수정 요청 데이터:', postData);
      const response = await axiosInstance.patch(`/board/${postId}`, postData);
      console.log('수정 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('게시글 수정 실패:', error);
      throw error;
    }
  },

  // 게시글 삭제
  async deletePost(postId) {
    try {
      const response = await axios.post(`${BASE_URL}/board/${postId}/delete`);
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
  async incrementViews(boardId) {
    try {
      const response = await axios.patch(`${BASE_URL}/board/${boardId}/view`);
      return response.data;
    } catch (error) {
      console.error('조회수 증가 실패:', error);
      throw error;
    }
  },

  // 게시글 좋아요
  async likePost(postId, memberName) {
    try {
      const response = await axios.patch(`${BASE_URL}/board/${postId}/like`, memberName, {
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      return response.data;
    } catch (error) {
      console.error('게시글 좋아요 실패:', error);
      throw error;
    }
  },

  // 댓글 목록 가져오기 
  async getComments(postId) { 
    try { 
      const response = await axiosInstance.get(`/board/${postId}/comments`);
      return response.data; 
    } catch (error) { 
      console.error('댓글 목록 로딩 실패:', error); 
      throw error; 
    } 
  },

// 댓글 작성 
  async createComment(boardId, memberId, comment) { 
    try { 
      const response = await axiosInstance.post(`/board/${boardId}/comments`, { memberId, comment }); 
      console.log('댓글 작성 응답:', response.data);
      return response.data; 
  } catch (error) { 
      console.error('댓글 작성 실패:', error); 
      throw error; 
    } 
  },

// 댓글 삭제 
  async deleteComment(boardId, commentId) { 
    try { 
      const response = await axiosInstance.post(`/board/${boardId}/comments/delete`, { commentId }); 
      console.log('댓글 삭제 응답:', response.data); 
      return response.data; 
    } catch (error) { 
      console.error('댓글 삭제 실패:', error); 
      throw error; 
    } 
  } 
};

export default FreeBoardAxios;