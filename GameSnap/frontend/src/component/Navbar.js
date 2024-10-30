import React, { useState } from 'react';
import LoginForm from './LoginForm';
import MainPage from './MainPage';
import UserPage from './UserPage';

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleLoginSuccess = () => {
    console.log('로그인 성공!');
    setIsLoggedIn(true);  // 로그인 상태를 true로 변경
    setIsLoginOpen(false); // 로그인 모달 닫기
  };

  return (
    <div className="h-screen overflow-hidden">
      <nav className="bg-black shadow-lg p-4 flex justify-between fixed top-0 left-0 right-0 z-10">
        <div className="text-2xl font-bold text-white">GameSnap</div>
        <ul className="flex space-x-4">
          <div className="flex justify-end">
            {!isLoggedIn && (
              <button
                onClick={handleLoginClick}
                className="px-6 py-3 bg-white text-black-600 font-semibold rounded-md hover:bg-green-700 hover:text-white"
              >
                회원 로그인
              </button>
            )}
            {isLoggedIn && (
              <div className="text-white px-6 py-3">
                환영합니다!
              </div>
            )}
          </div>
        </ul>
      </nav>

        
      {/* 페이지 전환 애니메이션 */}
      <div className="relative h-full">
        {/* 메인 페이지 */}
        <div
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            isLoggedIn ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          <MainPage />
        </div>
        {/* 유저 페이지 */}
        <div
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            isLoggedIn ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <UserPage />
        </div>
      </div>

      {/* 로그인 모달 */}
      {isLoginOpen && (
        <LoginForm 
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default Navbar;