// FriendService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:1111';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

const FriendService = {
  // 친구 목록 조회
  async getFriends() {
    try {
      const response = await axiosInstance.get('/friends');
      return response.data;
    } catch (error) {
      console.error('친구 목록 조회 실패:', error);
      throw error;
    }
  },

  // 친구 검색
  async searchUsers(nickname) {
    try {
      const response = await axiosInstance.get(`/users/search`, {
        params: { nickname }
      });
      return response.data;
    } catch (error) {
      console.error('사용자 검색 실패:', error);
      throw error;
    }
  },

  // 친구 요청 보내기
  async sendFriendRequest(targetUserId) {
    try {
      const response = await axiosInstance.post('/friends/request', {
        targetUserId
      });
      return response.data;
    } catch (error) {
      console.error('친구 요청 실패:', error);
      throw error;
    }
  },

  // 친구 요청 수락
  async acceptFriendRequest(requestId) {
    try {
      const response = await axiosInstance.post(`/friends/request/${requestId}/accept`);
      return response.data;
    } catch (error) {
      console.error('친구 요청 수락 실패:', error);
      throw error;
    }
  },

  // 친구 요청 거절
  async rejectFriendRequest(requestId) {
    try {
      const response = await axiosInstance.post(`/friends/request/${requestId}/reject`);
      return response.data;
    } catch (error) {
      console.error('친구 요청 거절 실패:', error);
      throw error;
    }
  },

  // 친구 삭제
  async removeFriend(friendId) {
    try {
      const response = await axiosInstance.delete(`/friends/${friendId}`);
      return response.data;
    } catch (error) {
      console.error('친구 삭제 실패:', error);
      throw error;
    }
  },

  // 친구 상태 조회 (온라인/오프라인)
  async getFriendStatus(friendId) {
    try {
      const response = await axiosInstance.get(`/friends/${friendId}/status`);
      return response.data;
    } catch (error) {
      console.error('친구 상태 조회 실패:', error);
      throw error;
    }
  }
};

export default FriendService;