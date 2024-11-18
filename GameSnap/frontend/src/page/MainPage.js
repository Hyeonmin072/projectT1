// MainPage.js
/* eslint-disable */
import React from 'react';
import PageTransition from '../component/PageTransition';
import MainPageDesign from './MainPageDesign';


const MainPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-100 z-30">
        <div className="mx-auto">
          <div className="text-center ">
            <MainPageDesign />
          </div>
        </div>
      </div>  
    </PageTransition>
  );
};

export default MainPage;