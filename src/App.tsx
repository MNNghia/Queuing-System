import React from 'react';
import './App.scss';
import Login from './layouts/Login/Login';
import {Routes, Route} from 'react-router-dom'
import User from './pages/User';
import DashBoardPage from './pages/DashBoardPage';
import DevicePage from './pages/DevicePage/DevicePage';
import ManagerDevicePage from './pages/ManagerDevicePage';
import DeviceDetailPage from './pages/DeviceDetailPage';
import ServicePage from './pages/ServicePage';
import AddServicePage from './pages/AddServicePage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Login/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/dashboard" element={<DashBoardPage/>}/>
        <Route path="/device/listDevice" element={<DevicePage/>}/>
        <Route path="/device/listDevice/addDevice" element={<ManagerDevicePage/>}/>
        <Route path="/device/listDevice/detailDevice" element={<DeviceDetailPage/>}/>
        <Route path="/service" element={<ServicePage/>}/>
        <Route path="/service/addService" element={<AddServicePage/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
