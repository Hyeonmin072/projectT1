/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './component/Navbar';  
import Footer from './component/Footer';  
import MainPage from './page/MainPage'; 
import UserPage from './page/UserPage';  
import { AuthProvider } from './context/AuthContext';
import FreeBoardList from './page/FreeBoardList';  
import FreeBoardWrite from './page/FreeBoardWrite'; 

// AnimatePresence를 사용하기 위한 래퍼 컴포넌트
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait"> {/* 페이지 전환 애니메이션 */}

      <Routes location={location} key={location.pathname}> {/* 페이지 라우팅 */}
        <Route path="/" element={<MainPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/contact" element={<Footer />} />
        <Route path="/board" element={<FreeBoardList />} />
        <Route path="/board/write" element={<FreeBoardWrite />} />
      </Routes>
      <Footer /> {/* 푸터 고정 */}
      
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 text-gray-900">
          <Navbar />
          <div className="pt-[73px]">
            <AnimatedRoutes />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;