/*eslint-disable*/
import React, { useState, useCallback, useEffect } from 'react';
import { Menu, User, LogOut } from 'lucide-react';
import Sidebar from './Sidebar';
import LoginForm from './LoginForm';
import MainPage from '../page/MainPage';
import UserPage from '../page/UserPage';
import SearchBar from './Searchbar';
import RegisterForm from './RegisterForm';  
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import loginAxios from '../axios/LoginAxios';

const Navbar = () => {  
  const { isLoggedIn, setIsLoggedIn, userData, initialRender  } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState('none');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isFirstMount, setIsFirstMount] = useState(true);
  const [enableTransition, setEnableTransition] = useState(false);
  
  const navigate = useNavigate();


  useEffect(() => {
    if (!localStorage.getItem('hasLoaded')) {
      // 첫 로드 시에는 애니메이션 없음
      localStorage.setItem('hasLoaded', 'true');
    } else {
      // 이후 상태 변경 시에만 애니메이션 활성화
      setEnableTransition(true);
    }
  }, []);

  // 로그인/로그아웃 시에만 애니메이션 활성화
  useEffect(() => {
    if (isLoggedIn !== undefined) {
      setEnableTransition(true);
    }
  }, [isLoggedIn]);


  const handleSwitchToRegister = useCallback(() => {
    console.log('레지스터 스위칭 핸들 실행');
    setCurrentForm('register');
  }, []);

  const handleLoginSuccess = () => {
    console.log('로그인 성공!');
    setIsLoggedIn(true);
    setIsLoginOpen(false);
    navigate('/user'); // 로그인 성공 시 UserPage로 이동
  };

  const handleLogout = async () => {
    try {
      await loginAxios.logout();
      console.log('로그아웃 성공');
      setShowUserMenu(false);
      
      // 애니메이션이 끝난 후 상태 변경
      setTimeout(() => {
        setIsLoggedIn(false);
        setIsSidebarOpen(false);
        sessionStorage.removeItem('token'); // localStorage 대신 sessionStorage 사용
        sessionStorage.removeItem('user');
        navigate('/');
      }, 300); // 애니메이션 시간만큼 대기

    } catch (error) {
      console.error('로그아웃 에러 상세 : ', error);
    }

    setIsLoggedIn(false);
    setIsSidebarOpen(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setShowUserMenu(false);
    navigate('/'); // 로그아웃 시 메인 페이지로 이동
  };

  useEffect(() => {
    // 로그인 상태에 따라 페이지 리다이렉트
    if (isLoggedIn) {
      navigate('/user');
    } else {
      navigate('/');
    }
  }, [isLoggedIn]);

  
  return (
    <>
      <nav className="bg-black shadow-lg p-4 fixed top-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* 로고 */}
          <div 
            className="text-2xl font-bold text-white hover:text-green-600 flex-shrink-0
            transition-colors duration-700 cursor-pointer"
            onClick={() => navigate('/user')}
          >
            GameSnap
          </div>
  
          {/* 검색바 */}
          {/* <div className="flex-grow max-w-2xl mx-4">
            <SearchBar />
          </div> */}
  
          {/* 우측 버튼들 */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* 로그인/프로필 버튼 컨테이너 */}
            <div className="relative h-12 w-40">
              <div className={`absolute w-full transform
                  ${enableTransition ? 'transition-all duration-500' : ''}
                  ${!isLoggedIn 
                    ? 'translate-x-0 opacity-100' 
                    : '-translate-x-full opacity-0 pointer-events-none'}`}
              >
                <button
                  onClick={() => {
                    setCurrentForm('login');
                    setIsLoginOpen(true);
                  }}
                  className="w-full px-6 py-3 bg-white text-black-600 font-semibold rounded-md 
                  hover:bg-green-700 hover:text-white transition-all duration-600"
                >
                  회원 로그인
                </button>
              </div>
  
              <div className={`absolute w-full transform
                ${enableTransition ? 'transition-all duration-700' : ''}
                ${isLoggedIn 
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-full opacity-0 pointer-events-none'}`}
              >
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 
                  bg-green-600 text-white rounded-md hover:bg-green-900 transition-all duration-400"
                >
                  <User size={20} />
                  <span className="max-w-[100px] truncate" >{userData?.name || '사용자'}</span>
                </button>
                </div>
              </div>
            </div>
  
            <div className={`transform 
                ${enableTransition ? 'transition-all duration-300' : ''}
                ${isLoggedIn ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0 pointer-events-none'}`}
            >
              {isLoggedIn && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 hover:bg-green-800 rounded-full transition-colors duration-600"
                >
                  <Menu size={24} color="white" />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
  
      {currentForm === 'login' && (
        <LoginForm 
          onClose={() => setCurrentForm('none')}
          onRegisterClick={() => setCurrentForm('register')}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      
      {currentForm === 'register' && (
        <RegisterForm
          onClose={() => setCurrentForm('none')}
          onRegisterSuccess={() => setCurrentForm('login')}
          onLoginClick={() => setCurrentForm('login')}
        />
      )}
  
      <Sidebar 
        isOpen={isSidebarOpen && isLoggedIn} 
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
      />
    </>
  );}

export default Navbar;