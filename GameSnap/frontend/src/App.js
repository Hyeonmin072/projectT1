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
import MainProfile from './profile/MainProfile' ;
import SetProfile from './profile/UpdateProfile';

// AnimatePresence를 사용하기 위한 래퍼 컴포넌트
function AnimatedRoutes() {
  
    const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/contact" element={<Footer />} />
        <Route path="/board" element={<FreeBoardList />} />
        <Route path="/board/write" element={<FreeBoardWrite />} />
        
        
        <Route path="/profile" element={<MainProfile />} />
        <Route path="/profile/edit" element={<SetProfile />} />
      </Routes>
      <Footer />
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