import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isSliding, setIsSliding] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  // 앱이 처음 실행될 때 한 번만 실행
  useEffect(() => {
    // 브라우저를 완전히 닫았다가 다시 열었을 때만 초기화
    if (!localStorage.getItem('appInitialized')) {
      localStorage.setItem('appInitialized', 'true');
      setInitialRender(true);
    } else {
      setInitialRender(false);
    }

    // 컴포넌트가 언마운트될 때 클린업
    return () => {
      setInitialRender(false);
    };
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('user');
    
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        console.log("Loaded user data:", parsedUser); // 디버깅용
        setIsLoggedIn(true);
        setUserData(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        // 잘못된 데이터면 세션 클리어
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
      }
    }
  }, []);

  // 로그인 함수
  const login = (userData, token) => {
    console.log("Saving user data:", userData); // 디버깅용
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(userData));
    
    setIsLoggedIn(true);
    setUserData(userData);
    
  };

  const updateUserData = useCallback((newData) => {
    console.log('AuthContext 업데이트 전:', userData);
    console.log('새로운 데이터:', newData);
    
    setUserData(newData);
    
    // 상태 업데이트 확인
    console.log('AuthContext 업데이트 후:', newData);
}, []);

  // 로그아웃 함수
  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserData(null);
  };

  // value 객체 제거하고 직접 전달
  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      userData,
      setUserData,
      isSliding,
      setIsSliding,
      login,
      logout,
      initialRender,
      updateUserData,
      setInitialRender
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};