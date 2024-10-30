import React from 'react';
import Navbar from './component/Navbar';
import Hero from './component/Hero';
import About from './component/About';
import Projects from './component/Projects';
import Contact from './component/Contact';
import LoginForm from './component/LoginForm';

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
