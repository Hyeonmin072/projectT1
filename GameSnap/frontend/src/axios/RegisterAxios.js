import axios from 'axios';

// API 기본 URL 설정
const API_URL = "http://3.37.183.85:1111";
// 회원가입 요청 함수
export const register = async (userData) => {
  try {
    console.log("Tel value:", userData.tel);
    console.log("email value:", userData.email);
    console.log("password value:", userData.password);
    console.log("name value:", userData.name);
    const response = await axios.post(`${API_URL}/register`, {
      email: userData.email,
      password: userData.password,
      name: userData.name,
      tel: userData.tel
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

export const verifyCodeCheck = async (email,verifyCode) => {
  console.log("전송하는 코드:",verifyCode);
  try{
    const response = await axios.post(`${API_URL}/verifyEmail`,{
      email : email,
      verifyCode : verifyCode
    });
    return response.data;
  }catch (error){
    throw error;
  }
}

// 이메일 인증 코드 저언송
export const sendEmail = async (email) => {
  console.log("전송하는 이메일:",email);
  try {
    const response = await axios.post(`${API_URL}/sendEmail`, {
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

// 닉네임 중복 확인 함수
export const checkNameDuplicate = async (name) => {
  try {
    console.log("nameValue :",name)
    const response = await axios.post(`${API_URL}/check-name`, {
      name: name
    });
    console.log("Axios Response:", response.data);
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
export default checkNameDuplicate;