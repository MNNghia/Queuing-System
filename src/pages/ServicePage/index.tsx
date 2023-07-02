import "./ServicePage.scss";
import DashboardLayout from "../../layouts/Dashboard/DashboardLayout";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import DropDown from "../../components/DropDown";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import CustomInput from "../../components/input/CustomInput";
import images from "../../assests/images";
import TruncateMarkup from "react-truncate-markup";
import { Link } from "react-router-dom";
import CustomPagination from "../../components/Pagination";



function ServicePage() {
    const dispatch = useDispatch<AppDispatch>();

    const [isTruncated, setIsTruncated] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const data = [];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Dịch vụ", url: "" },
            { label: "Quản lý dịch vụ", url: "/service" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);

    const onChange: DatePickerProps["onChange"] = (date, dateString) => {
        console.log(date, dateString);
    };

    const toggleTruncate = () => {
        setIsTruncated(!isTruncated);
    };

    return (
        <DashboardLayout>
            <div className="wrapper-service">
                <div className="title">Quản lý dịch vụ</div>
                <div className="wrapper-service-content">
                    <div className="service-content__filter-items">
                        <div className="service-content__filter-item">
                            <DropDown
                                type="stateActive"
                                label="Trạng thái hoạt động"
                            />
                        </div>
                        
                        <div className="service-content__filter-item data-time-item">
                            <p>Chọn thời thời gian</p>
                            <div className="date-time">
                                <DatePicker onChange={onChange} className="data-time__item" />
                                <img src={images.arrow_right.default} alt="" style={{padding: "0 10px"}} />
                                <DatePicker onChange={onChange} className="data-time__item" />
                            </div>
                        </div>
                        <div className="service-content__filter-item">
                            <CustomInput type="search" label="Từ khóa" placeholder="nhập từ khóa" />
                        </div>
                    </div>

                    <div className="service-content__table">
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
                    
                    <Link to="/service/addService" className="button-add">
                        <img src={images.add.default} alt="" /><br/>
                        Thêm thiết bị 
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default ServicePage;
