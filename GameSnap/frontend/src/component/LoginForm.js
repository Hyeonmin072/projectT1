import React, { useState, useEffect } from 'react';
import { login } from './axios/LoginAxios';

const LoginForm = ({ onClose, onLoginSuccess, onRegisterClick }) => {
  // 상태 관리
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  // 초기 마운트 시 애니메이션
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // props 디버깅을 위한 useEffect
  useEffect(() => {
    console.log('LoginForm props:', {
      hasOnClose: !!onClose,
      hasOnLoginSuccess: !!onLoginSuccess,
      hasOnRegisterClick: !!onRegisterClick
    });
  }, [onClose, onLoginSuccess, onRegisterClick]);

  // 폼 닫기 핸들러
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300); // 애니메이션 시간
  };

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.trim() // 공백 제거
    }));
    // 에러 메시지 초기화
    if (error) setError('');
  };

  // 회원가입 전환 핸들러
  const handleRegisterClick = () => {
    console.log('로그인 폼에서 회원가입 폼 클릭됨');
    setIsVisible(false);
    setTimeout(() => {
    onRegisterClick?.();  // props로 전달받은 함수 호출
  }, 300);
  };

  // 로그인 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 기본 유효성 검사
    if (!formData.email || !formData.password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('올바른 이메일 형식이 아닙니다.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await login(formData.email, formData.password);
      console.log('Login successful:', response.data);
      
      // 성공 시 처리
      setIsVisible(false);
      setTimeout(() => {
        onLoginSuccess?.(response.data);
        onClose?.();
      }, 300);
    } catch (error) {
      console.error('Login error:', error);
      
      // 에러 메시지 설정
      
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.status === 401) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        setError('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      {/* 배경 오버레이 */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* 로그인 폼 */}
      <div className={`
        bg-white rounded-lg w-full max-w-md relative
        transform transition-all duration-300 z-60
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>
        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 
                   transition-colors duration-200"
                   
        >
          ✕
        </button>
        
        <div className="p-6">
          <h2 className="text-xl font-bold text-center mb-6">로그인</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 이메일 입력 */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 
                         focus:ring-green-500 focus:border-transparent
                         transition-all duration-200"
                required
                disabled={isLoading}
              />
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 
                         focus:ring-green-500 focus:border-transparent
                         transition-all duration-200"
                required
                disabled={isLoading}
              />
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            {/* 추가 옵션 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-gray-300"
                  disabled={isLoading}
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  자동 로그인
                </label>
              </div>
              <button 
                type="button"
                className="text-sm text-green-500 hover:text-green-700
                         transition-colors duration-200"
                disabled={isLoading}
              >
                비밀번호 찾기
              </button>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-lg
                       transition-all duration-200
                       ${isLoading 
                         ? 'bg-gray-400 cursor-not-allowed' 
                         : 'bg-green-600 hover:bg-green-700'} 
                       text-white focus:outline-none focus:ring-2 
                       focus:ring-green-500 focus:ring-offset-2`}
              disabled={isLoading}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>

            {/* 회원가입 링크 */}
            <div className="text-center text-sm text-gray-600">
              계정이 없으신가요?{' '}
              <button 
                type="button"
                onClick={handleRegisterClick}
                className="text-green-500 hover:text-green-700 font-bold
                         transition-colors duration-200"
                disabled={isLoading}
                
              >
                회원가입
              </button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// defaultProps 설정
LoginForm.defaultProps = {
  onClose: () => {},
  onLoginSuccess: () => {},
  onRegisterClick: () => {}
};

export default LoginForm;