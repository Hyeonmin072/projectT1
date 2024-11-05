/* eslint-disable */

import React, {} from 'react';
import Navbar from './component/Navbar';
import Contact from './component/Contact';
import { AuthProvider } from './context/AuthContext';

function App() {

  return (

    <AuthProvider>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Navbar/>
        <Contact />
    </div>
    </AuthProvider>
  )
}
export default App;