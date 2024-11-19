import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMutation } from '@tanstack/react-query'; // React Query의 mutation 훅 임포트
import { login as loginAPI } from '../axios/LoginAxios';

const LoginForm = ({ onClose, onLoginSuccess, onRegisterClick }) => {
  // AuthContext에서 로그인 함수와 슬라이딩 상태 관리 함수 가져오기
  const { login, setIsSliding } = useAuth();
  
  // 모달 표시 여부를 위한 상태
  const [isVisible, setIsVisible] = useState(false);
  
  // 폼 입력값을 관리하는 상태
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // React Query mutation 설정
  const loginMutation = useMutation({
    // 실제 로그인 API 호출 함수 정의
    mutationFn: async ({ email, password }) => {
      const response = await loginAPI(email, password);
      // 응답 데이터 검증
      if (!response || !response.data) {
        throw new Error('로그인 응답 데이터가 없습니다.');
      }
      return response.data;
    },
    // 로그인 성공 시 실행되는 콜백
    onSuccess: (data) => {
      // 서버 응답에서 사용자 데이터 구성
      const userData = {
        id: data.id,
        email: data.email,
        name: data.name,
        tel: data.tel,
        image: data.image,
        content: data.content,
        likeGamesId: data.gamesId,
        preferredGame: data.gamesName,
        createDate: data.createDate,
        role: 'user'
      };

      // 슬라이딩 애니메이션 시작
      setIsSliding(true);
      setIsVisible(false);

      // 로그인 처리 및 콜백 실행 (애니메이션 타이밍 조정)
      setTimeout(() => {
        login(userData, data.token); // 컨텍스트 로그인 함수 호출
        onLoginSuccess?.(data); // 성공 콜백 실행
        onClose?.(); // 모달 닫기
        
        // 슬라이딩 애니메이션 종료
        setTimeout(() => {
          setIsSliding(false);
        }, 500);
      }, 300);
    },
    // 에러 발생 시 실행되는 콜백
    onError: (error) => {
      console.error('Login error:', error);
    }
  });

  // 컴포넌트 마운트 시 페이드인 애니메이션
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // 폼 닫기 핸들러
  const handleClose = () => {
    setIsVisible(false); // 페이드아웃 시작
    setTimeout(() => {
      onClose?.(); // 애니메이션 후 실제 닫기
    }, 300);
  };

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    // 공백 제거하여 폼 데이터 업데이트
    setFormData(prev => ({
      ...prev,
      [name]: value.trim()
    }));
    // 이전 에러 상태 초기화
    if (loginMutation.error) {
      loginMutation.reset();
    }
  };

  // 회원가입 폼으로 전환 핸들러
  const handleRegisterClick = () => {
    setIsVisible(false); // 페이드아웃 시작
    setTimeout(() => {
      onRegisterClick?.(); // 애니메이션 후 전환
    }, 300);
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 입력값 검증
    if (!formData.email || !formData.password) {
      loginMutation.error = new Error('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      loginMutation.error = new Error('올바른 이메일 형식이 아닙니다.');
      return;
    }

    // mutation 실행 (실제 로그인 시도)
    loginMutation.mutate(formData);
  };

  return (
    // 모달 컨테이너
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 배경 오버레이 (클릭 시 닫기) */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 
          ${isVisible ? 'bg-opacity-50' : 'bg-opacity-0'}`}
        onClick={handleClose}
      />

      {/* 로그인 폼 모달 */}
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
        
        {/* 폼 컨텐츠 */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-center mb-6">로그인</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 이메일 입력 필드 */}
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
                disabled={loginMutation.isPending}
              />
            </div>

            {/* 비밀번호 입력 필드 */}
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
                disabled={loginMutation.isPending}
              />
            </div>

            {/* 에러 메시지 표시 */}
            {loginMutation.error && (
              <div className="text-red-500 text-sm text-center">
                {loginMutation.error.message}
              </div>
            )}

            {/* 추가 옵션 영역 */}
            <div className="flex items-center justify-between">
              {/* 자동 로그인 체크박스 */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-gray-300"
                  disabled={loginMutation.isPending}
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  자동 로그인
                </label>
              </div>
              {/* 비밀번호 찾기 링크 */}
              <button 
                type="button"
                className="text-sm text-green-500 hover:text-green-700
                         transition-colors duration-200"
                disabled={loginMutation.isPending}
              >
                비밀번호 찾기
              </button>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-lg
                       transition-all duration-200
                       ${loginMutation.isPending 
                         ? 'bg-gray-400 cursor-not-allowed' 
                         : 'bg-green-600 hover:bg-green-700'} 
                       text-white focus:outline-none focus:ring-2 
                       focus:ring-green-500 focus:ring-offset-2`}
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? '로그인 중...' : '로그인'}
            </button>

            {/* 회원가입 링크 영역 */}
            <div className="text-center text-sm text-gray-600">
              계정이 없으신가요?{' '}
              <button 
                type="button"
                onClick={handleRegisterClick}
                className="text-green-500 hover:text-green-700 font-bold
                         transition-colors duration-200"
                disabled={loginMutation.isPending}
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

// 기본 props 설정
LoginForm.defaultProps = {
  onClose: () => {},
  onLoginSuccess: () => {},
  onRegisterClick: () => {}
};

export default LoginForm;