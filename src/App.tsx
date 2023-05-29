import React from 'react';
import './App.scss';
import Login from './layouts/Login/Login';
import {Routes, Route} from 'react-router-dom'
import DashboardLayout from './layouts/Dashboard/DashboardLayout';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<DashboardLayout/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
