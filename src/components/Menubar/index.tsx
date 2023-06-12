import "./Menubar.scss";
import images from "../../assests/images";
import { Space } from "antd";
import { Link } from "react-router-dom";
import CustomButton from "../button";


function Menubar() {
    return (
        <div className="wrapper-menu">
            <img src={`${images.logo}`} alt="" className="logo-menu" />

            <div className="menu-items">
                <Space direction="vertical" style={{ width: "100%" }}>
                    <Link to="/dashboard" className="menu-item active">
                        <img src={images.nav_dashboard.default} alt="" />
                        <p>Dashboard</p>
                    </Link>
                    <Link to="/device/listDevice" className="menu-item">
                        <img src={images.nav_monitor.default} alt="" />
                        <p>Thiết bị</p>
                    </Link>
                    <Link to="/service" className="menu-item ">
                        <img src={images.nav_service.default} alt="" />
                        Dịch vụ
                    </Link>
                    <Link to="/number" className="menu-item">
                        <img src={images.menu_number.default} alt="" />
                        Cấp số
                    </Link>
                    <Link to="/report" className="menu-item">
                        <img src={images.nav_report.default} alt="" />
                        Báo cáo
                    </Link>
                    <div className="setting-system">
                        <div className="menu-item">
                            <img src={images.nav_setting.default} alt="" />
                            Cài đặt hệ thống
                            <div className="setting-system__items">
                                <Link to="/settingSystem/roleManage" className="setting-system__item">
                                    Quản lý vai trò
                                </Link>
                                <Link to="/settingSystem/accountManage" className="setting-system__item">
                                    Quản lý tài khoản
                                </Link>
                                <Link to="/settingSystem/diaryAction" className="setting-system__item">
                                    Nhật ký người dùng
                                </Link>
                            </div>
                        </div>
                    </div>
                </Space>
            </div>

            <div className="btnLogOut">
                <CustomButton text="Đăng xuất" type="BtnBlur" />
            </div>
        </div>
    );
}

export default Menubar;
