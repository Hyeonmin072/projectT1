import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:1112/',
});



// 사용자 프로필 가져오기
export const getProfile = async (id) => {
    try {
        return await apiClient.get('/getProfile' , { params: { id } });
    } catch (error) {
        console.error('Error fetching profile data:', error);
        return null; // 오류 발생 시 null 반환
    }
};

// 사용자 프로필 변경하기
export const updateProfile = async (id, { email, phone, preferredGenre, password }) => {
    try {
        // PUT 요청을 사용하여 사용자 정보를 업데이트
        const response = await apiClient.put('/updateProfile', {
            id, 
            email,
            phone,                 // 변경할 전화번호
            preferredGenre,        // 선택한 선호 장르
            password
        });
        return response.data;      // 서버 응답 데이터를 반환
    } catch (error) {
        console.error('Error updating profile data:', error);
        return null;               // 오류 발생 시 null 반환
    }
};


