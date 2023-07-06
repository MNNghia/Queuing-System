import "./Menubar.scss";
import images from "../../assests/images";
import { Space } from "antd";
import { Link } from "react-router-dom";
import CustomButton from "../button";
import { useState } from "react";
import { useCookies } from "react-cookie";

function Menubar() {
    const [active, setActive] = useState("");
    const [cookies, , removeCookie] = useCookies(["accessToken"]);

    const logout = () => {
        removeCookie("accessToken", { path: "/" });
    };
    if (cookies.accessToken === undefined) {
        window.location.href = "/";
    }

    const MenuItem = [
        {
            path: "/dashboard",
            icon: images.nav_dashboard.default,
            text: "Dashboard",
            iconActive: images.nav_dashboardActive.default,
        },
        {
            path: "/device/listDevice",
            icon: images.nav_monitor.default,
            text: "Thiết bị",
            iconActive: images.monitorActive.default,
        },
        {
            path: "/service",
            icon: images.nav_service.default,
            text: "Dịch vụ",
            iconActive: images.serviceActive.default,
        },
        {
            path: "/number",
            icon: images.menu_number.default,
            text: "Cấp số",
            iconActive: images.numberActive.default,
        },
        {
            path: "/report",
            icon: images.nav_report.default,
            text: "Báo cáo",
            iconActive: images.reportActive.default,
        },
    ];

    const settingSystem = [
        {
            path: "/settingSystem/roleManage",
            text: "Quản lý vai trò",
        },
        {
            path: "/settingSystem/accountManage",
            text: "Quản lý tài khoản",
        },
        {
            path: "/settingSystem/diaryAction",
            text: "Nhật ký người dùng",
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
                            <img
                                src={
                                    window.location.pathname === value.path
                                        ? value.iconActive
                                        : value.icon
                                }
                                alt=""
                            />
                            <p>{value.text}</p>
                        </Link>
                    ))}

                    <div className="setting-system">
                        <div
                            className={
                                window.location.pathname ===
                                    "/settingSystem/roleManage" ||
                                window.location.pathname ===
                                    "/settingSystem/accountManage" ||
                                window.location.pathname ===
                                    "/settingSystem/diaryAction"
                                    ? "menu-item active"
                                    : "menu-item"
                            }
                        >
                            <img src={ window.location.pathname ===
                                    "/settingSystem/roleManage" ||
                                window.location.pathname ===
                                    "/settingSystem/accountManage" ||
                                window.location.pathname ===
                                    "/settingSystem/diaryAction" ? images.settingActive.default:images.nav_setting.default} alt="" />
                            Cài đặt hệ thống
                            <div className="setting-system__items">
                                {settingSystem.map((value, index) => (
                                    <Link
                                        key={index}
                                        to={value.path}
                                        className={
                                            window.location.pathname ===
                                            value.path
                                                ? "setting-system__item active"
                                                : "setting-system__item"
                                        }
                                        onClick={() => setActive(value.path)}
                                    >
                                        {value.text}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </Space>
            </div>

            <div className="btnLogOut">
                <CustomButton
                    text="Đăng xuất"
                    type="BtnBlur"
                    onClick={logout}
                />
            </div>
        </div>
    );
}

export default Menubar;
