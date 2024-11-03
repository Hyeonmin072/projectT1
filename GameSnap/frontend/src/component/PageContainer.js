import React, { useState } from 'react';
import LoginForm from './LoginForm';
import MainPage from './MainPage';
import UserPage from './UserPage';

const PageContainer = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLoginSuccess = (data) => {
    setIsTransitioning(true);
    // 로그인 성공 후 애니메이션 처리
    setTimeout(() => {
      setIsAuthenticated(true);
    }, 300); // 애니메이션 duration과 일치
  };

  return (
    <div className="relative overflow-hidden w-full h-screen">
      {/* 메인 페이지와 유저 페이지 컨테이너 */}
      <div
        className={`flex transition-transform duration-300 ease-in-out w-[200%] h-full
          ${isTransitioning ? '-translate-x-1/2' : 'translate-x-0'}`}
      >
        {/* 메인 페이지 */}
        <div className="w-full h-full flex-shrink-0">
          <MainPage />
          {!isAuthenticated && (
            <div className="fixed inset-0 z-50">
              <LoginForm
                onLoginSuccess={handleLoginSuccess}
                onClose={() => {}}
                onRegisterClick={() => {}}
              />
            </div>
          )}
        </div>

        {/* 유저 페이지 */}
        <div className="w-full h-full flex-shrink-0">
          <UserPage />
        </div>
      </div>
    </div>
  );
};

export default PageContainer;