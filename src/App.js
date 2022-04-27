import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login, Signup, Detail, Mall, Change,Main } from './pages/index';
import RegisterProduct from './pages/RegisterProduct';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/registerproduct" element={<RegisterProduct />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/mall" element={<Mall />} />
        <Route path="/change" element={<Change />} />
        <Route path="/main" element={<Main/>}/>
      </Routes>
    </React.Fragment>
  );
};

export default App;


    
