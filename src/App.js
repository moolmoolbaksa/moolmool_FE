import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login, Signup } from './pages/index';
import RegisterProduct from './pages/RegisterProduct';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/registerproduct" element={<RegisterProduct />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;


    
