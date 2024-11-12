// Sidebar.js
/* eslint-disable */
import React, {useState} from 'react';
import { X, Home, User, Settings, MessagesSquare, LogOut, SquareMenu, Users, MonitorUp } from 'lucide-react';
import { Link, useHistory } from 'react-router-dom';
import Profile from '../profile/MainProfile';
import Community from './Community';



const Sidebar = ({ isOpen, onClose, onLogout }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = () => {
    console.log('Sidebar : 로그아웃 호출');
    onLogout(); // 로그아웃 함수 호출
    onClose(); // 사이드바 닫기
  };


  const handleDelete = async () => {
    if (window.confirm("정말로 계정을 삭제하시겠습니까?")) {
      setIsLoading(true);
    }
  }

  //커뮤니티 스테이트
  const [showCommunity, setShowCommunity] = useState(false);
  
  //커뮤니티 클릭 핸들러
  const handleCommunityClick = (e) => {
    e.preventDefault();
    setShowCommunity(true);
  };

  //커뮤니티 닫기 핸들러
  const handleCloseCommunity = () => {
    setShowCommunity(false);
  };
  


  const [showProfile, setShowProfile] = useState(false); // 프로필 화면 상태

  const handleProfileClick = (e) => {
    e.preventDefault(); // 링크 클릭 시 기본 동작 방지
    setShowProfile(true); // 프로필 화면 열기
  };

  const handleCloseProfile = () => {
    setShowProfile(false); // 프로필 화면 닫기
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
            <Link to="user/" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Home className="mr-3" size={20} />
              홈
            </Link>
            <Link to="/board" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <SquareMenu className="mr-3" size={20} />
              게시판
            </Link>
            <Link to="/ChatList" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <MessagesSquare className="mr-3" size={20} />
              채팅
            </Link>
            <Link to="/profile" onClick={handleProfileClick} className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <User className="mr-3" size={20} />
              프로필
            </Link>
            <Link to="/" onClick={handleCommunityClick} className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Users className="mr-3" size={20} />
              커뮤니티
            </Link>
          </nav>

          <div className="border-t">
            <button 
              className="flex right-4 p-3 mt-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MonitorUp className="mr-3" size={20} />
              업로드하기
            </button>
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

      {/* 프로필 화면 */}
      {showProfile && <Profile userId="사용자_ID_여기에_입력" onClose={handleCloseProfile} />}

      <Community isOpen={showCommunity} onClose={handleCloseCommunity} />

    </>
  );
};

export default Sidebar;