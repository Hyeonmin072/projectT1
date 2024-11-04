import axios from 'axios';

// 사용자 프로필 가져오기
export const getProfile = async (userid) => {
    try {
        const response = await axios.get('/gamesnap/profile/${userid}');
        return response.data;
    } catch (error) {
        console.error('Error fetching profile data:', error);
        return null; // 오류 발생 시 null 반환
    }
};

// 사용자 프로필 업데이트
export const updateProfile = async (userInfo) => {
    try {
        const response = await axios.put('/gamesnap/profile/${userInfo.userid}', userInfo);
        return response.data; // 성공 시 응답 데이터 반환
    } catch (error) {
        console.error('Error updating profile:', error);
        return { success: false }; // 오류 발생 시 실패 객체 반환
    }
};

// 비밀번호 변경
export const updatePassword = async (newPassword) => {
    try {
        const response = await axios.put('/gamesnap/profile/password', { password: newPassword });
        return response.data; // 성공 시 응답 데이터 반환
    } catch (error) {
        console.error('Error updating password:', error);
        return { success: false }; // 오류 발생 시 실패 객체 반환
    }
};