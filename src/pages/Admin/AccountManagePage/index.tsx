import './AccountManage.scss'
import DashboardLayout from "../../../layouts/Admin";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import DropDown from "../../../components/DropDown";
import CustomInput from "../../../components/input/CustomInput";
import images from "../../../assests/images";
import { Link } from "react-router-dom";
import CustomPagination from "../../../components/Pagination";

function AccountManagePage() {

    const dispatch = useDispatch<AppDispatch>();

     const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const data = [];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Cài đặt hệ thống", url: "" },
            { label: "Quản lý tài khoản", url: "/settingSystem/accountManage" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);

    
    return (  
            <div className="wrapper-accountManage">
                <div className="title">Danh sách tài khoản</div>
                <div className="wrapper-accountManage__content">
                    <div className="content-filter">
                        <div className="content-filter__item drop-down">
                            <DropDown
                                type="stateActive"
                                label="Tên vai trò"
                            />
                        </div>

                        <div className="content-filter__item">
                            <CustomInput type="search" label="Từ khóa" placeholder="nhập từ khóa" />
                        </div>
                    </div>
                    <div className="content-table">
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

                        <CustomPagination
                            itemsPerPage={itemsPerPage}
                            totalItems={1} //data.length
                            onPageChange={handlePageChange}
                        />
                    </div>

                    <Link to="/settingSystem/accountManage/addAccount" className="button-add">
                        <img src={images.add.default} alt="" /><br/>
                        Thêm tài khoản
                    </Link>
                </div>
            </div>

    );
}

export default AccountManagePage;