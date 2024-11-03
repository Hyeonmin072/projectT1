import React, { useState } from 'react';
import LoginForm from './LoginForm';
import MainPage from './MainPage';
import UserPage from './UserPage';

const PageContainer = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
  
    const handleLoginSuccess = (data) => {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 300);
    };
  
    return (
      <div className="relative w-full h-screen"> {/* overflow-hidden 제거 */}
        <div
          className={`flex transition-transform duration-300 ease-in-out w-[200%] h-full
            ${isTransitioning ? '-translate-x-1/2' : 'translate-x-0'}`}
        >
          <div className="w-full h-full flex-shrink-0 bg-gray-100"> {/* bg-gray-100 추가 */}
            <MainPage />
            {!isAuthenticated && (
              <div className="fixed inset-0 z-50">
                <LoginForm
                  onLoginSuccess={handleLoginSuccess}
                  onClose={() => {}}
                  onRegisterClick={() => {}}
                />
              </div>
            )}
          </div>
          <div className="w-full h-full flex-shrink-0">
            <UserPage />
          </div>
        </div>
      </div>
    );
  };

export default PageContainer;