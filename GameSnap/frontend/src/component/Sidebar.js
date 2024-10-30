import React from 'react';
import { X, Home, User, Settings, HelpCircle, LogOut } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onClose}
        />
      )}

      {/* 사이드바 - 오른쪽에서 나오도록 수정 */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-700 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">메뉴</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-2">
            <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Home className="mr-3" size={20} />
              홈
            </a>
            <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <User className="mr-3" size={20} />
              프로필
            </a>
            <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="mr-3" size={20} />
              설정
            </a>
            <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <HelpCircle className="mr-3" size={20} />
              도움말
            </a>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
            <button className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
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