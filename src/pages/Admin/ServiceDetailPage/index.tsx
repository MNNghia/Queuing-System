import "./ServiceDetail.scss";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { DatePicker, DatePickerProps, Input } from "antd";
import CustomInput from "../../../components/input/CustomInput";
import images from "../../../assests/images";
import { Link } from "react-router-dom";
import CustomPagination from "../../../components/Pagination";
import { useSelector } from "react-redux";
import { fetchService } from "../../../redux/reducers/service";

function ServiceDetailPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector(
        (state: RootState) => state.service
    );

    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get("serviceId");

    ////get data
    useEffect(() => {
        dispatch(fetchService());
    }, [dispatch]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const dataPage = [];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Dịch vụ", url: "" },
            { label: "Quản lý dịch vụ", url: "/service" },
            { label: "Chi tiết", url: "service/serviceDetail" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);

    const onChange: DatePickerProps["onChange"] = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
            <div className="wrapper-serviceDetail">
                <div className="title">Quản lý dịch vụ</div>
                <div className="wrapper-serviceDetail-content">
                    <div className="serviceDetail-content__info">
                        <div className="service-item-info">
                            <div className="title" style={{ fontSize: "20px" }}>
                                Thông tin dịch vụ
                            </div>
                            {
                                    data.map((value, index) => {
                                        if(value.id === serviceId)
                                        {
                                            return <table>
                                
                                <tr>
                                    <td className="key">Mã dịch vụ: </td>
                                    <td className="value">{value.idService}</td>
                                </tr>
                                <tr>
                                    <td className="key">Tên dịch vụ:</td>
                                    <td className="value">{value.nameService}</td>
                                </tr>
                                <tr>
                                    <td className="key">Mô tả:</td>
                                    <td className="value">
                                        {value.serviceDescription}
                                    </td>
                                </tr>
                            </table>
                                        }
                                    })
                                }
                            
                        </div>

                        <div className="service-item-info">
                            <div className="title" style={{ fontSize: "20px" }}>
                                Quy tắc cấp số
                            </div>
                            <table>
                                <tr>
                                    <td className="key">Tăng tự động:</td>
                                    <td className="value ">
                                        <div className="checkbox-option-item__input">
                                            <Input value="000" />
                                            <span className="checkbox-option-item_label">
                                                đến
                                            </span>
                                            <Input value="999"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="key">Prefix:</td>
                                    <td className="value">
                                        <Input />
                                    </td>
                                </tr>
                                <div>
                                    <div
                                        className=""
                                        style={{ marginBottom: "10px" }}
                                    >
                                        <div className="key">
                                            Reset mỗi ngày
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="value">
                                            Vd: 201-2001
                                        </div>
                                    </div>
                                </div>
                            </table>
                        </div>
                    </div>

                    <div className="serviceDetail-content__list">
                        <div className="service-content__filter-items">
                            <div className="service-content__filter-item">
                                {/* <DropDown
                                    type="stateActive"
                                    label="Trạng thái hoạt động"
                                /> */}
                            </div>

                            <div className="service-content__filter-item data-time-item">
                                <p>Chọn thời thời gian</p>
                                <div className="date-time">
                                    <DatePicker
                                        onChange={onChange}
                                        className="data-time__item"
                                    />
                                    <img
                                        src={images.arrow_right.default}
                                        alt=""
                                        style={{ padding: "0 10px" }}
                                    />
                                    <DatePicker
                                        onChange={onChange}
                                        className="data-time__item"
                                    />
                                </div>
                            </div>
                            <div className="service-content__filter-item">
                                <CustomInput
                                    type="search"
                                    label="Từ khóa"
                                    placeholder="nhập từ khóa"
                                />
                            </div>
                        </div>
                        <div className="service-content__list-table">
                            <table
                                className="wrapper-table"
                                style={{ tableLayout: "fixed", width: "100%" }}
                            >
                                <tr>
                                    <th>Số thứ tự</th>
                                    <th>Trạng thái</th>
                                </tr>
                                <tr>
                                    <td>000000</td>
                                    <td>
                                        <img
                                            src={images.stopAction.default}
                                            alt=""
                                        />
                                        Ngưng hoạt động
                                    </td>
                                </tr>
                            </table>

                            <CustomPagination
                                itemsPerPage={itemsPerPage}
                                totalItems={1} //data.length
                                onPageChange={handlePageChange}
                            />
                        </div>

                        <Link
                            to=""
                            className="button-add"
                            style={{ top: "200px" }}
                        >
                            <img src={images.deviceUpdata.default} alt="" />
                            <br />
                            Cập nhật danh sách
                        </Link>
                        <div
                            className="button-add"
                            style={{ top: "296px" }}
                            onClick={() => {
                                window.history.back();
                            }}
                        >
                            <img src={images.comeBack.default} alt="" />
                            <br />
                            Quay lại
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default ServiceDetailPage;
