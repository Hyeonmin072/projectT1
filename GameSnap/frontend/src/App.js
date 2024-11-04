import React, {} from 'react';
import Navbar from './component/Navbar';
import Contact from './component/Contact';
import Profile from './component/Profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="font-sans bg-gray-100 text-gray-900">
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Contact />}></Route>
          <Route exact path='/profile' element={<Profile />}></Route>
        </Routes>
      </div>
    </Router>  
  );
}

export default App;