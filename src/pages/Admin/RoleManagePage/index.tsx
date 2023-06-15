import './RoleManage.scss'
import DashboardLayout from "../../../layouts/Admin";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import DropDown from "../../../components/DropDown";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import CustomInput from "../../../components/input/CustomInput";
import images from "../../../assests/images";
import TruncateMarkup from "react-truncate-markup";
import { Link } from "react-router-dom";
import CustomPagination from "../../../components/Pagination";

function RoleManagePage() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Cài đặt hệ thống", url: "" },
            { label: "Quản lý vai trò", url: "/settingSystem/roleManage" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);
    return (  
            <div className="wrapper-roleManage">
                <div className="title">Danh sách vai trò</div>
                <div className="wrapper-roleManage__content">
                    <div className="content-filter">
                        <div className="content-filter__item">
                            <CustomInput type="search" label="Từ khóa" placeholder="nhập từ khóa" />
                        </div>
                    </div>
                    <div className="table-content">
                        <table className="wrapper-table">
                            <tr>
                                <th>Mã dịch vụ</th>
                                <th>Tên dịch vụ</th>
                                <th>Mô tả</th>
                                <th>Trạng thái hoạt động</th>
                                
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>KIO.01</td>
                                <td>Kiosk</td>
                                <td>192.168.1.10</td>
                                <td>
                                    <img
                                        src={images.stopAction.default}
                                        alt=""
                                    />
                                    Ngưng hoạt động
                                </td>
                                <td>
                                    <Link to="/service/serviceDetail">Chi tiết</Link>
                                </td>
                                <td>
                                    <Link to="">Cập nhật</Link>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>KIO.01</td>
                                <td>Kiosk</td>
                                <td>192.168.1.10</td>
                                <td>
                                    <img src={images.action.default} alt="" />
                                    Hoạt động
                                </td>
                                <td>
                                    <Link to="/service/serviceDetail">Chi tiết</Link>
                                </td>
                                <td>
                                    <Link to="">Cập nhật</Link>
                                </td>
                            </tr>
                            
                        </table>
                    </div>

                    <Link to="/settingSystem/roleManage/addRole" className="button-add">
                        <img src={images.add.default} alt="" /><br/>
                        Thêm vai trò
                    </Link>
                </div>
            </div>
    );
}

export default RoleManagePage;