// src/components/Navbar.js
import React from 'react';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg p-4 flex justify-between">
      <div className="text-2xl font-bold text-blue-600">MyPortfolio</div>
      <ul className="flex space-x-4">
        <li><a href="#about" className="hover:text-blue-600">About</a></li>
        <li><a href="#projects" className="hover:text-blue-600">Projects</a></li>
        <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
