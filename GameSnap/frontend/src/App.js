import React, {} from 'react';
import Navbar from './component/Navbar';
import Contact from './component/Contact';
import Profile from './component/Profile';

function App() {

  return (
    
      <div className="font-sans bg-gray-100 text-gray-900">
        <Navbar/>
        <Contact />
        <Profile userid={userid} />
      </div>
  );
}

export default App;