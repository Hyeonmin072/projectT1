// MainPage.js
/* eslint-disable */
import React from 'react';
import PageTransition from '../component/PageTransition';

const MainPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-100 p-20 z-30">
        <div className="max-w-4xl mx-auto pt-20">
          <div className="text-center mt-20">
            <h1 className="text-4xl font-bold mb-4">Welcome to GameSnap</h1>
            <p className="text-xl text-gray-600">어서오세요, GameSnap 입니다.</p>
          </div>
        </div>
      </div>  
    </PageTransition>
  );
};

export default MainPage;