import axios from 'axios';

const BASE_URL = aws.env.REACT_APP_API_URL;

const FriendAxios = {
  // 친구 목록 조회
  async getFriendsList() {
    try {
      const response = await axios.get(`${BASE_URL}/api/friends`);
      return response.data;
    } catch (error) {
      console.error('친구 목록 조회 실패:', error);
      throw error;
    }
  },

  // 사용자 검색
  async searchUsers(nickname) {
    try {
      const response = await axios.get(`${BASE_URL}/api/users/search`, {
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
      const response = await axios.post(`${BASE_URL}/api/friends/request`, {
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
      const response = await axios.post(`${BASE_URL}/api/friends/request/${requestId}/accept`);
      return response.data;
    } catch (error) {
      console.error('친구 요청 수락 실패:', error);
      throw error;
    }
  },

  // 친구 요청 거절
  async rejectFriendRequest(requestId) {
    try {
      const response = await axios.post(`${BASE_URL}/api/friends/request/${requestId}/reject`);
      return response.data;
    } catch (error) {
      console.error('친구 요청 거절 실패:', error);
      throw error;
    }
  },

  // 친구 삭제
  async removeFriend(friendId) {
    try {
      await axios.delete(`${BASE_URL}/api/friends/${friendId}`);
    } catch (error) {
      console.error('친구 삭제 실패:', error);
      throw error;
    }
  }
};

export default FriendAxios;