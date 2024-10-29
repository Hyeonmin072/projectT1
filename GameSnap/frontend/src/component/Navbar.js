// src/components/Navbar.js
import React from 'react';

function Navbar() {
  return (
    <nav className="bg-black shadow-lg p-4 flex justify-between">
      <div className="text-2xl font-bold text-white">GameSnap</div>
      <ul className="flex space-x-4">
        <li><a href="#about" className="hover:text-green-600 text-white font-bold">About</a></li>
        <li><a href="#projects" className="hover:text-green-600 text-white font-bold">Projects</a></li>
        <li><a href="#contact" className="hover:text-green-600 text-white font-bold">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
