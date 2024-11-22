// import axios from 'axios';
// const BaseURL= 'http://localhost:1111';

// const apiClient = axios.create({
//     baseURL: BaseURL,
//           headers: {
//           "Content-Type": "application/json",
//           "Accept": 'application/json'}
// });


// const ProfilePage = {
//     // 사용자 프로필 가져오기
//     async getProfile (userid){
//         try {
//             const response = await apiClient.get('/getProfile' , { params: { userid } });
//             return response.data;
//         } catch (error) {
//             console.error('Error fetching profile data:', error);
//             return null; // 오류 발생 시 null 반환
//         }
//     },

//     // 사용자 프로필 변경하기
//     async updateProfile (updatedUserInfo){
//         try {
//             // PUT 요청을 사용하여 사용자 정보를 업데이트
//             const response = await apiClient.put('/updateProfile', updatedUserInfo
//             );
//             return response.data;      // 서버 응답 데이터를 반환
//         } catch (error) {
//             console.error("Error updating profile data:", error);
//             throw error; // 오류 발생 시 에러를 던져 상세 확인 가능
//         }
//     },

//     async getGameList (){
//         try{
//             return await apiClient.get('/game');
//         } catch(error){
//             console.error(error);
//         }
//     }
// }


// export default ProfilePage;


// api/profileApi.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const fetchUserProfile = async (userId) => {
  const response = await axios.get(`${BASE_URL}/users/${userId}`);
  return response.data;
};

export const fetchUserVideos = async (userId) => {
  const response = await axios.get(`${BASE_URL}/users/${userId}/videos`);
  return response.data;
};

export const updateProfile = async (userId, updateData) => {
  const response = await axios.put(`${BASE_URL}/users/${userId}`, updateData);
  return response.data;
};

export const updatePassword = async (userId, passwordData) => {
  const response = await axios.put(`${BASE_URL}/users/${userId}/password`, passwordData);
  return response.data;
};