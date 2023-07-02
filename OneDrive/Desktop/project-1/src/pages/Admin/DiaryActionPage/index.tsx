import './DiaryAction.scss'
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
import { Link } from "react-router-dom";
import CustomPagination from "../../../components/Pagination";

function DiaryActionPage() {

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
            { label: "Nhật ký hoạt động", url: "/settingSystem/diaryAction" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);

    const onChange: DatePickerProps["onChange"] = (date, dateString) => {
        console.log(date, dateString);
    };
    return (  
            <div className="wrapper-diaryAction">
                <div className="title">Quản lý cấp số</div>
                <div className="wrapper-diaryAction__content">
                    <div className="content-filter">
                        
                        <div className="content-filter__item data-time-item">
                            <p>Chọn thời thời gian</p>
                            <div className="date-time">
                                <DatePicker onChange={onChange} className="data-time__item" />
                                <img src={images.arrow_right.default} alt="" style={{padding: "0 10px"}} />
                                <DatePicker onChange={onChange} className="data-time__item" />
                            </div>
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

                </div>
            </div>

    );
}

export default DiaryActionPage;