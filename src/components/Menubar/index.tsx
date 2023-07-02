import "./Menubar.scss";
import images from "../../assests/images";
import { Space } from "antd";
import { Link } from "react-router-dom";
import CustomButton from "../button";
import { useState, useEffect } from "react";

function Menubar() {
    const [active, setActive] = useState("");

    const MenuItem = [
        {
            path: "/dashboard",
            icon: images.nav_dashboard.default,
            text: "Dashboard",
        },
        {
            path: "/device/listDevice",
            icon: images.nav_monitor.default,
            text: "Thiết bị",
        },
        {
            path: "/service",
            icon: images.nav_service.default,
            text: "Dịch vụ",
        },
        {
            path: "/number",
            icon: images.menu_number.default,
            text: "Cấp số",
        },
        {
            path: "/report",
            icon: images.nav_report.default,
            text: "Báo cáo",
        },
    ];

    return (
        <div className="wrapper-menu">
            <img src={`${images.logo}`} alt="" className="logo-menu" />

            <div className="menu-items">
                <Space direction="vertical" style={{ width: "100%" }}>
                    {MenuItem.map((value, index) => (
                        <Link
                            to={value.path}
                            className={
                                window.location.pathname === value.path
                                    ? "menu-item active"
                                    : "menu-item"
                            }
                            key={index}
                            onClick={() => setActive(value.path)}
                        >
                            <img src={value.icon} alt="" />
                            <p>{value.text}</p>
                        </Link>
                    ))}

                    <div className="setting-system">
                        <div 
                            className='menu-item'
                        >
                            <img src={images.nav_setting.default} alt="" />
                            Cài đặt hệ thống
                            <div className="setting-system__items">
                                <Link
                                    to="/settingSystem/roleManage"
                                    className= "setting-system__item"
                                >
                                    Quản lý vai trò
                                </Link>
                                <Link
                                    to="/settingSystem/accountManage"
                                    className= "setting-system__item"
                                >
                                    Quản lý tài khoản
                                </Link>
                                <Link
                                    to="/settingSystem/diaryAction"
                                    className= "setting-system__item"
                                >
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
