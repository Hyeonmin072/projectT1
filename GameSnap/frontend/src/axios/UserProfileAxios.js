import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:1112/',
  });

// 사용자 프로필 가져오기
export const getProfile = async (userid) => {
    try {
        return await apiClient.get('/getProfile' , { params: { userid } });
    } catch (error) {
        console.error('Error fetching profile data:', error);
        return null; // 오류 발생 시 null 반환
    }
};
