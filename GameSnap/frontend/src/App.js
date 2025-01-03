/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './component/Navbar';  
import Footer from './component/Footer';  
import MainPage from './page/MainPage'; 
import UserPage from './page/UserPage';  
import ProfilePage from './page/ProfilePage';
import { AuthProvider } from './context/AuthContext';
import FreeBoardList from './page/FreeBoardList';  
import FreeBoardWrite from './page/FreeBoardWrite';
import FreeBoardPage from './page/FreeBoardPage';
import ChatList from './page/ChatList';
import ModifyPage from './page/ModifyPage';
import UserVideosPage from './page/UserVideoPage';
import PageTransition from './component/PageTransition';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


//React Query Client 생성
const queryClient = new QueryClient()

// AnimatePresence를 사용하기 위한 래퍼 컴포넌트
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="sync" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/contact" element={<Footer />} />
        <Route path="/board" element={<FreeBoardList />} />
        <Route path="/board/write" element={<FreeBoardWrite />} />
        <Route path="/board/:postId" element={<FreeBoardPage />} />
        <Route path="/chatList" element={<ChatList />} />
        <Route path="/board/modify/:postId" element={<ModifyPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/videos" element={<UserVideosPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 text-gray-900">
            <Navbar />
            <div className="pt-[73px]">
              <AnimatedRoutes />
            </div>
            {/* <Footer /> */}
          </div>
        </Router>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;