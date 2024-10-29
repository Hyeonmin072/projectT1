// src/components/Hero.js
import React from 'react';

function Hero() {
  return (
    <section className="h-screen bg-white-600 text-white flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold mb-4 text-black">Welcome to GameSnap</h1>
      <p className="text-lg mb-8 text-black">어서오세요, GameSnap 입니다.</p>
      <a href="#projects" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-blue-700 hover:text-white hover ">
        회원 로그인
      </a>
      <br></br>
    </section>
  );
}

export default Hero;
