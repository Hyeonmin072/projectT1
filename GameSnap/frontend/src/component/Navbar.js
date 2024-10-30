// Navbar.js
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import LoginForm from './LoginForm';
import MainPage from './MainPage';
import UserPage from './UserPage';

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLoginSuccess = () => {
    console.log('로그인 성공!');
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  return (
    <div className="h-screen overflow-hidden">
      <nav className="bg-black shadow-lg p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-20">
        <div className="text-2xl font-bold text-white hover:text-green-600">
          GameSnap
        </div>

        <div className="flex items-center space-x-4">
          {!isLoggedIn && (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="px-6 py-3 bg-white text-black-600 font-semibold rounded-md hover:bg-green-700 hover:text-white"
            >
              회원 로그인
            </button>
          )}
          {isLoggedIn && (
            <div className="text-white px-6 py-3">
              환영합니다! (이 부분은 로그인 구현 후 유저 이름으로 변경)
            </div>
          )}
          
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-green-800 rounded-full"
          >
            <Menu size={24} color="white" />
          </button>
        </div>
      </nav>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
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

      {isLoginOpen && (
        <LoginForm 
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          className="p-6 bg-white shadow-lg rounded-lg
            transition-all duration-500"
        />
      )}
    </div>
  );
};

export default Navbar;