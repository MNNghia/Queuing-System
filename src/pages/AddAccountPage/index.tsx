import './AddAccount.scss'
import DashboardLayout from "../../layouts/Dashboard/DashboardLayout";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import CustomButton from "../../components/button";
import { DatePicker, DatePickerProps, Input, Select } from "antd";
import DropDown from "../../components/DropDown";
import CustomInput from "../../components/input/CustomInput";
import images from "../../assests/images";
import { Link } from "react-router-dom";
import { Row, Col } from 'antd';
import CustomPagination from "../../components/Pagination";

function AddAccountPage() {
    const dispatch = useDispatch<AppDispatch>();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const data = [];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "CCài đặt hệ thống", url: "" },
            { label: "Quản lý tài khoản", url: "/settingSystem/accountManage" },
            { label: "Thêm tài khoản", url: "/settingSystem/accountManage/addAccount" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);


    return (
        <DashboardLayout>
            <div className="wrapper-managerDevice">
                <div className="title">Quản lý thiết bị</div>
                <div className="wrapper-managerDevice__content">
                    <div className="title" style={{ fontSize: "20px" }}>
                        Thông tin thiết bị
                    </div>
                    <div className="device-info">
                        <Row>
                            <Col span={12}>
                                <div className="device-info__items">
                                    <CustomInput
                                        label="Mã thiết bị:"
                                        type="text"
                                        request
                                        placeholder="Nhập mã thiết bị"
                                    />
                                    <CustomInput
                                        label="Tên thiết bị:"
                                        type="text"
                                        request
                                        placeholder="Nhập mã thiết bị"
                                    />
                                    <CustomInput
                                        label="Địa chỉ IP:"
                                        type="text"
                                        request
                                        placeholder="Nhập mã thiết bị"
                                    />
                                    <div
                                        className=""
                                        
                                    >
                                        <DropDown
                                            type="typeDevice"
                                            label="Loại thiết bị:"
                                            placeholder="Chọn loại thiết bị"
                                            require
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div
                                    className="device-info__items"
                                    style={{ float: "right" }}
                                >
                                    <div
                                        className=""
                                        style={{ marginBottom: "32px" }}
                                    >
                                        <DropDown
                                            type="typeDevice"
                                            label="Loại thiết bị:"
                                            placeholder="Chọn loại thiết bị"
                                            require
                                        />
                                    </div>
                                    <CustomInput
                                        label="Tên đăng nhập:"
                                        type="text"
                                        request
                                        placeholder="Nhập tài khoản "
                                    />
                                    <CustomInput
                                        label="Mật khẩu:"
                                        type="text"
                                        request
                                        placeholder="Nhập mật khẩu"
                                    />
                                    <div
                                        className=""
                                        style={{ marginBottom: "32px" }}
                                    >
                                        <DropDown
                                            type="typeDevice"
                                            label="Loại thiết bị:"
                                            placeholder="Chọn loại thiết bị"
                                            require
                                        />
                                    </div>
                                </div>
                            </Col>
                            <p
                                style={{
                                    fontSize: "16px",
                                    lineHeight: "21px",
                                    color: "#7E7D88",
                                    paddingTop: "20px",
                                }}
                            >
                                {" "}
                                <span className="require">*</span> là trường
                                thông tin bắt buộc
                            </p>
                        </Row>
                    </div>
                </div>

                <div className="wrapper-managerDevice__btn">
                    <CustomButton type="BtnOutline" text="Hủy bỏ" onClick={() => {window.history.back()}}/>
                    <CustomButton type="BtnDefault" text="Thêm" />
                </div>
            </div>
        </DashboardLayout>
    );
}

export default AddAccountPage