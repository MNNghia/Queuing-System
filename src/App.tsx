import React from 'react';
import './App.scss';
import Login from './layouts/Login/Login';
import {Routes, Route} from 'react-router-dom'
import User from './pages/User';
import DashBoardPage from './pages/DashBoardPage';
import DevicePage from './pages/DevicePage/DevicePage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Login/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/dashboard" element={<DashBoardPage/>}/>
        <Route path="/device/listDevice" element={<DevicePage/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
