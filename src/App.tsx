import React from "react";
import "./App.scss";
import Login from "./layouts/Login/Login";
import { Routes, Route } from "react-router-dom";
import User from "./pages/Admin/User";
import DashBoardPage from "./pages/Admin/DashBoardPage";
import DevicePage from "./pages/Admin/DevicePage";
import ManagerDevicePage from "./pages/Admin/ManagerDevicePage";
import DeviceDetailPage from "./pages/Admin/DeviceDetailPage";
import ServicePage from "./pages/Admin/ServicePage";
import AddServicePage from "./pages/Admin/AddServicePage";
import ServiceDetailPage from "./pages/Admin/ServiceDetailPage";
import NumberPage from "./pages/Admin/NumberPage";
import NumberNewPage from "./pages/Admin/NumberNewPage";
import ReportPage from "./pages/Admin/ReportPage";
import ResetPasswordPage from "./pages/Admin/ResetPasswordPage";
import RoleManagePage from "./pages/Admin/RoleManagePage";
import AddRolePage from "./pages/Admin/AddRolePage";
import AccountManagePage from "./pages/Admin/AccountManagePage";
import AddAccountPage from "./pages/Admin/AddAccountPage";
import DiaryActionPage from "./pages/Admin/DiaryActionPage";
import AdminLayout from "./layouts/Admin";

function App() {
    return (
        <div className="App">
            {
                window.location.pathname === "/" || window.location.pathname === "/resetPassword"? <Routes>
                <Route index path="/" element={<Login />} />
                <Route path="/resetPassword" element={<ResetPasswordPage />} />
            </Routes> : 
                    <AdminLayout>
                <Routes>
                    <Route path="/user" element={<User />} />
                    <Route path="/dashboard" element={<DashBoardPage />} />
                    <Route path="/device/listDevice" element={<DevicePage />} />
                    <Route
                        path="/device/listDevice/addDevice"
                        element={<ManagerDevicePage />}
                    />
                    <Route
                        path="/device/listDevice/detailDevice"
                        element={<DeviceDetailPage />}
                    />
                    <Route path="/service" element={<ServicePage />} />
                    <Route
                        path="/service/addService"
                        element={<AddServicePage />}
                    />
                    <Route
                        path="/service/serviceDetail"
                        element={<ServiceDetailPage />}
                    />
                    <Route path="/number" element={<NumberPage />} />
                    <Route
                        path="/number/numberNew"
                        element={<NumberNewPage />}
                    />
                    <Route path="/report" element={<ReportPage />} />
                    <Route
                        path="/settingSystem/roleManage"
                        element={<RoleManagePage />}
                    />
                    <Route
                        path="/settingSystem/roleManage/addRole"
                        element={<AddRolePage />}
                    />
                    <Route
                        path="/settingSystem/accountManage"
                        element={<AccountManagePage />}
                    />
                    <Route
                        path="/settingSystem/accountManage/addAccount"
                        element={<AddAccountPage />}
                    />
                    <Route
                        path="/settingSystem/diaryAction"
                        element={<DiaryActionPage />}
                    />
                </Routes>
            </AdminLayout>
            }
            

            
        </div>
    );
}

export default App;
