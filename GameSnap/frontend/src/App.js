import React from 'react';
import Navbar from './component/Navbar';
import Contact from './component/Contact';

function App() {
  return (
    <div className="font-sans bg-gray-100 text-gray-900">
      <Navbar></Navbar>
      <Contact />
    </div>
  );
}

export default App;
