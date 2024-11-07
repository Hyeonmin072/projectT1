// FreeBoardAxios.js
import axios from 'axios';

// 기본 URL 설정
const BASE_URL = 'http://localhost:1111/api'; // 백엔드 서버 URL

const FreeBoardAxios = {
  // 게임 목록 가져오기
  async getGames() {
    try {
      const response = await axios.get(`${BASE_URL}/games`);
      return response.data;
    } catch (error) {
      console.error('게임 목록 조회 실패:', error);
      throw error;
    }
  },

  // 게시글 목록 가져오기
  async getPosts(gameGenre) {
    try {
      const response = await axios.get(`${BASE_URL}/posts`, {
        params: { gameGenre }
      });
      return response.data;
    } catch (error) {
      console.error('게시글 목록 조회 실패:', error);
      throw error;
    }
  },

  // 게시글 작성
  async createPost(postData) {
    try {
      const response = await axios.post(`${BASE_URL}/posts`, postData);
      return response.data;
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      throw error;
    }
  },

  // 게시글 상세 조회
  async getPostDetail(postId) {
    try {
      const response = await axios.get(`${BASE_URL}/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error('게시글 상세 조회 실패:', error);
      throw error;
    }
  },

  // 게시글 수정
  async updatePost(postId, postData) {
    try {
      const response = await axios.put(`${BASE_URL}/posts/${postId}`, postData);
      return response.data;
    } catch (error) {
      console.error('게시글 수정 실패:', error);
      throw error;
    }
  },

  // 게시글 삭제
  async deletePost(postId) {
    try {
      const response = await axios.delete(`${BASE_URL}/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      throw error;
    }
  },

  // 게시글 검색
  async searchPosts(gameGenre, searchTerm) {
    try {
      const response = await axios.get(`${BASE_URL}/posts/search`, {
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
      const response = await axios.put(`${BASE_URL}/posts/${postId}/views`);
      return response.data;
    } catch (error) {
      console.error('조회수 증가 실패:', error);
      throw error;
    }
  }
};

export default FreeBoardAxios;