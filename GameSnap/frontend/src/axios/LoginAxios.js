import axios from 'axios';

const apiClient = axios.create({
  baseURL: "http://localhost:1111",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    
  },
  withCredentials: true // 쿠키를 포함하여 요청
});

export const login = async (email, password) => {
  try {
    
    console.log('로그인 요청 URL:', `${apiClient.defaults.baseURL}/login`);
    console.log('로그인 요청 데이터:', { email, password });
    
    // 서버로 보내는 데이터 형식을 서버 요구사항에 맞게 수정
    const requestData = {
      email: email,
      password: password
    };

    const response = await apiClient.post('/login', requestData);
    
    console.log('서버 응답:', response);

    // 응답이 undefined인 경우 처리
    if (!response.data) {
      throw new Error('서버로부터 응답 데이터를 받지 못했습니다.');
    }

    return response;
  } catch (error) {
    console.error('로그인 에러 상세:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });

    // 에러 재throw 전에 더 자세한 메시지 추가
    if (error.response?.status === 404) {
      throw new Error('로그인 API 엔드포인트를 찾을 수 없습니다. 서버 URL을 확인해주세요.');
    } else if (!error.response) {
      throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
    }
    throw error;
  }
};

export const logout = async () => { 
  try { 
    const response = await apiClient.post('/logout'); 
    console.log('로그아웃 성공:', response.data); 
  } catch (error) { 
    console.error('로그아웃 에러 상세 : ', error); 
    throw error; 
  } 
};
export default {login, logout};