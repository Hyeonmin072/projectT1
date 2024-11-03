// Sidebar.js
/* eslint-disable */
import React from 'react';
import { X, Home, User, Settings, MessagesSquare, LogOut, SquareMenu, } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, onLogout }) => {
  const handleLogout = () => {
    onLogout(); // 로그아웃 함수 호출
    onClose(); // 사이드바 닫기
  };

  return (
    <>
      {/* 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30" 
          onClick={onClose}
        />
      )}

      {/* 사이드바 */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-700 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">메뉴</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-2 flex-grow">
            <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Home className="mr-3" size={20} />
              홈
            </a>
            <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <SquareMenu className="mr-3" size={20} />
              게시판
            </a>
            <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <MessagesSquare className="mr-3" size={20} />
              채팅
            </a>
            <a href="User.js" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <User className="mr-3" size={20} />
              프로필
            </a>
          </nav>




          <div className="border-t">
            <button 
              onClick={handleLogout}
              className="flex items-center w-full p-3 mt-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="mr-3" size={20} />
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;