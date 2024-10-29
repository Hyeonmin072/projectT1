// src/components/Navbar.js
import React from 'react';

function Navbar() {
  return (
    <nav className="bg-black shadow-lg p-4 flex justify-between">
      <div className="text-2xl font-bold text-white">GameSnap</div>


      <ul className="flex space-x-4">
        <div className="flex justify-end">
          <a href="#projects" className="px-6 py-1 bg-white text-black-600 font-semibold rounded-md hover:bg-blue-700 hover:text-white">
            회원 로그인
          </a>
        </div>
        <li><a href="#about" className="flex flex-col items-end space-y-2 hover:text-green-600 text-white font-bold ">About</a></li>
        <li><a href="#projects" className="flex flex-col items-end space-y-2 hover:text-green-600 text-white font-bold">Projects</a></li>
        <li><a href="#contact" className="flex flex-col items-end space-y-2 hover:text-green-600 text-white font-bold">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
