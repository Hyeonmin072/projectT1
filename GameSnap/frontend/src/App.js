/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './component/Navbar';  // component -> components
import Contact from './component/Contact';  // component -> components
import MainPage from './page/MainPage';  // component -> components
import UserPage from './page/UserPage';  // component -> components
import { AuthProvider } from './context/AuthContext';
import FreeBoardList from './page/FreeBoardList';  // component -> components
import FreeBoardWrite from './page/FreeBoardWrite';  // component -> components

// AnimatePresence를 사용하기 위한 래퍼 컴포넌트
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/board" element={<FreeBoardList />} />
        <Route path="/board/write" element={<FreeBoardWrite />} />
      </Routes>
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