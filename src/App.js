import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/index';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;


    
