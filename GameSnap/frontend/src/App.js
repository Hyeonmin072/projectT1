import React from 'react';
import Navbar from './component/Navbar';
import Hero from './component/Hero';
import Contact from './component/Contact';

function App() {
  return (
    <div className="font-sans bg-gray-100 text-gray-900">
      <Navbar></Navbar>
      <Hero />
      <Contact />
    </div>
  );
}

export default App;
