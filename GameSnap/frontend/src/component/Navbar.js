import React, { useState, useCallback } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import LoginForm from './LoginForm';
import MainPage from './MainPage';
import UserPage from './UserPage';
import SearchBar from './Searchbar';
import RegisterForm from './RegisterForm';  

const Navbar = () => {  
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState('none');

  const handleSwitchToRegister = useCallback(() => {
    console.log('handleSwitchToRegister executed');
    setCurrentForm('register');
  }, []);

  const handleLoginSuccess = () => {
    console.log('로그인 성공!');
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    console.log('로그아웃');
    setIsLoggedIn(false);
    setIsSidebarOpen(false); // 사이드바도 함께 닫기
    // 필요한 경우 여기에 추가적인 로그아웃 로직을 구현하세요
    // 예: 토큰 제거, 서버에 로그아웃 요청 등
  };

  return (
    <div className="h-screen overflow-hidden">
      <nav className="bg-black shadow-lg p-4 fixed top-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* 로고 */}
          <div className="text-2xl font-bold text-white hover:text-green-600 flex-shrink-0">
            GameSnap
          </div>

          {/* 검색바 */}
          <div className="flex-grow max-w-2xl mx-4">
            <SearchBar />
          </div>

          {/* 우측 버튼들 */}
          <div className="flex items-center space-x-4 flex-shrink-0">
          {!isLoggedIn && (  // isLoginOpen 대신 isLoggedIn으로 조건 변경
            <button
              onClick={() => {
                setCurrentForm('login');
                setIsLoginOpen(true);
                console.log('Current form state changed to:', currentForm);
                console.log('Navbar login clicked');
              }}
              className="px-6 py-3 bg-white text-black-600 font-semibold rounded-md hover:bg-green-700 hover:text-white"
            >
              회원 로그인
            </button>
)}

          {/* 여기까지가 로그인 버튼 */}

          {/* 여기부터 로그인 클릭 후 로직 */}
          {currentForm === 'login' && (  // () 대신 && 사용
            <LoginForm 
              onClose={() => {
                console.log('Login form closing');
                setCurrentForm('none');
              }}
              onRegisterClick={() => {  // 여기를 함수로 수정
                console.log('Switching to register form');
                setCurrentForm('register');
              }}
            />
          )}
            {currentForm === 'register' && (  // () 대신 && 사용
              <RegisterForm
                onClose={() => {
                  console.log('Register form closing');
                  setCurrentForm('none');
                }}
                onRegisterSuccess={() => {
                  console.log('Register success');
                  setCurrentForm('login');
                }}
                onLoginClick={() => {  // 로그인으로 돌아가기 위한 함수
                  setCurrentForm('login');
                }}
              />
            )}

            {isLoggedIn && (
              <div className="text-white px-6 py-3">
                환영합니다!
                {/* (이 부분은 로그인 구현 후 유저 이름으로 변경) */}
              </div>
            )}
            
            {/* 여기까지가 로그인 클릭 후 로직 */}

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-green-800 rounded-full"
            >
              <Menu size={24} color="white" />
            </button>
          </div>
        </div>
      </nav>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
      />

      {/* 페이지 전환 로직 */}
      <div className="relative h-full mt-[73px]">
        <div
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
            isLoggedIn ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          <MainPage />
        </div>
        
        <div
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
            isLoggedIn ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <UserPage />
        </div>
      </div>

    </div>
  );
};
export default Navbar;