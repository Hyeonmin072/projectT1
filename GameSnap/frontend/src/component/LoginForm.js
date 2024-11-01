import React, { useState, useEffect } from 'react';
import { login } from './axios/LoginAxios';
/* eslint-disable*/

const LoginForm = ({ onClose, onLoginSuccess }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(''); // Error state 추가

  useEffect(() => {
    // 마운트 시 페이드 인 효과
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // 페이드 아웃 애니메이션 후 닫기
    setTimeout(onClose, 500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.email,formData.password);
    try {
      const response = await login(formData.email, formData.password);
      
      console.log('Login successful:', response.data);
      onLoginSuccess(); // 성공 시 호출
      onClose(); // 모달 닫기
    } catch (error) {
      if (error.response) {
        // 요청이 이루어졌고, 서버가 상태 코드로 응답했으나 요청이 실패했을 때
        console.error('Login error response:', error.response.data);
      } else if (error.request) {
        // 요청이 이루어졌으나 응답이 없었을 때
        console.error('Login error request:', error.request);
      } else {
        // 오류가 발생한 요청을 설정하는 중에 발생한 문제
        console.error('Login error message:', error.message);
      }
      setError('Login failed. Please check your credentials.'); // 오류 메시지 설정
      console.error('Login error:', error);
  
      
      
      
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      {/* 배경 오버레이 */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-500 ${
          isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* 로그인 폼 */}
      <div className={`
        bg-white rounded-lg w-full max-w-md relative
        transform transition-all duration-500
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          ✕
        </button>
        
        <div className="p-6">
          <h2 className="text-xl font-bold text-center mb-6">로그인</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {error && ( // 에러 메시지 출력
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-gray-300"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  자동 로그인
                </label>
              </div>
              <a href="#" className="text-sm text-green-500 hover:text-green-900">
                비밀번호 찾기
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-900
              transition-colors duration-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              로그인
            </button>

            <div className="text-center text-sm text-gray-600">
              계정이 없으신가요?{' '}
              <a href="#" className="text-green-500 hover:text-green-900 font-bold">
                회원가입
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
