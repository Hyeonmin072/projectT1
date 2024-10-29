// src/components/Hero.js
import React from 'react';

function Hero() {
  return (
    <section className="h-screen bg-blue-600 text-white flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to HairTalk</h1>
      <p className="text-lg mb-8">I'm a Full-Stack Developer</p>
      <a href="#projects" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-blue-700 hover:text-white">
        회원로그인
      </a>
      <br></br>
      <a href="#projects" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-blue-700 hover:text-white">
        디자이너 로그인
        </a>
    </section>
  );
}

export default Hero;
