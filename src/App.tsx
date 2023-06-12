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
import ServiceDetailPage from './pages/ServiceDetailPage';
import NumberPage from './pages/NumberPage';
import NumberNewPage from './pages/NumberNewPage';
import ReportPage from './pages/ReportPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import RoleManagePage from './pages/RoleManagePage';
import AddRolePage from './pages/AddRolePage';
import AccountManagePage from './pages/AccountManagePage';
import AddAccountPage from './pages/AddAccountPage';
import DiaryActionPage from './pages/DiaryActionPage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Login/>}/>
        <Route index path="/resetPassword" element={<ResetPasswordPage/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/dashboard" element={<DashBoardPage/>}/>
        <Route path="/device/listDevice" element={<DevicePage/>}/>
        <Route path="/device/listDevice/addDevice" element={<ManagerDevicePage/>}/>
        <Route path="/device/listDevice/detailDevice" element={<DeviceDetailPage/>}/>
        <Route path="/service" element={<ServicePage/>}/>
        <Route path="/service/addService" element={<AddServicePage/>}/>
        <Route path="/service/serviceDetail" element={<ServiceDetailPage/>} />
        <Route path="/number" element={<NumberPage/>} />
        <Route path="/number/numberNew" element={<NumberNewPage/>} />
        <Route path="/report" element={<ReportPage/>}/>
        <Route path="/settingSystem/roleManage" element={<RoleManagePage/>} />
        <Route path="/settingSystem/roleManage/addRole" element={<AddRolePage/>} />
        <Route path="/settingSystem/accountManage" element={<AccountManagePage/>} />
        <Route path="/settingSystem/accountManage/addAccount" element={<AddAccountPage/>} />
        <Route path="/settingSystem/diaryAction" element={<DiaryActionPage/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
