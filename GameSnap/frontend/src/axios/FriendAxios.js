import axios from 'axios';

const BASE_URL = "http://13.209.226.109:1111";

const FriendAxios = {
  // 친구 목록 조회
  async getFriendsList(myId) {
    try {
      const response = await axios.get(`${BASE_URL}/friend`, {
        params: { myId }
      });
      return response.data;
    } catch (error) {
      console.error('친구 목록 조회 실패:', error);
      throw error;
    }
  },

  // 사용자 검색
  async searchMember(nickName, memberId) {
    try {
      const response = await axios.get(`${BASE_URL}/search/member`, {
        params: { nickName, memberId }
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('사용자 검색 실패:', error);
      throw error;
    }
  },

  // 친구 요청 보내기
  async sendFriendRequest(myId, targetUserId) {
    try {
      const response = await axios.post(`${BASE_URL}/friend`, null, {
        params: { myId, targetUserId }
      });
      return response.data;
    } catch (error) {
      console.error('친구 요청 실패:', error);
      throw error;
    }
  },

  // 친구 요청 수락
  // async acceptFriendRequest(requestId) {
  //   try {
  //     const response = await axios.post(`${BASE_URL}/api/friends/request/${requestId}/accept`);
  //     return response.data;
  //   } catch (error) {
  //     console.error('친구 요청 수락 실패:', error);
  //     throw error;
  //   }
  // },

  // // 친구 요청 거절
  // async rejectFriendRequest(requestId) {
  //   try {
  //     const response = await axios.post(`${BASE_URL}/api/friends/request/${requestId}/reject`);
  //     return response.data;
  //   } catch (error) {
  //     console.error('친구 요청 거절 실패:', error);
  //     throw error;
  //   }
  // },

  // 친구 삭제
  async removeFriend(myId, targetUserId) {
    try {
      await axios.post(`${BASE_URL}/friend/delete`, null, {
        params: { myId, targetUserId }
      });
    } catch (error) {
      console.error('친구 삭제 실패:', error);
      throw error;
    }
  }
};

export default FriendAxios;