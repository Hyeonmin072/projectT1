import axios from 'axios';

// API 기본 URL 설정
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:1111';

// 회원가입 요청 함수
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email: userData.email,
      password: userData.password,
      name: userData.name,
      phone: userData.phone
    });

    // 회원가입 성공 시 처리
    if (response.data) {
      console.log('Registration successful:', response.data);
      return response;
    }
  } catch (error) {
    // 에러 처리를 위해 상위 컴포넌트로 에러를 전파
    throw error;
  }
};

// 이메일 중복 확인 함수
export const checkEmailDuplicate = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/check-email`, {
      email: email
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 전화번호 중복 확인 함수
export const checkPhoneDuplicate = async (phone) => {
  try {
    const response = await axios.post(`${API_URL}/check-phone`, {
      phone: phone
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// // 회원가입 검증 코드 확인 함수 (이메일 인증 등이 필요한 경우)
// export const verifyRegistration = async (email, code) => {
//   try {
//     const response = await axios.post(`${API_URL}/verify`, {
//       email: email,
//       code: code
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };