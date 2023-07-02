import "./ManagaerDevicePage.scss";
import DashboardLayout from "../../layouts/Dashboard/DashboardLayout";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import DropDown from "../../components/DropDown";
import CustomInput from "../../components/input/CustomInput";
import { Col, Row, Select } from "antd";
import type { SelectProps } from "antd";
import CustomButton from "../../components/button";

const options: SelectProps["options"] = [];

function ManagerDevicePage() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Thiết bị", url: "" },
            { label: "Danh sách thiết bị", url: "/device/listDevice" },
            { label: "Thêm thiết bị", url: "/device/listDevice/addDevice" },
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
                                </div>
                            </Col>
                            <Col span={24}>
                                <label
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "600",
                                        lineHeight: "27px",
                                        paddingBottom: "8px",
                                        display: 'inline-block'
                                    }}
                                >
                                    Dịch vụ sử dụng:
                                    <span className="require">*</span>
                                </label>
                                <Select
                                    mode="multiple"
                                    // defaultValue={}
                                    style={{
                                        width: "100%",
                                        fontSize: "18px",
                                        cursor: "pointer",
                                        color: "#fff",
                                    }}
                                    placeholder="Nhập dịch vụ sử dụng"
                                    // onChange={}
                                    options={[
                                        {
                                            value: "1",
                                            label: "1 sdf sdf sfsdfsfsdf",
                                        },
                                        { value: "2", label: "2" },
                                    ]}
                                />
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
                    <CustomButton type="BtnDefault" text="Cập nhật" />
                </div>
            </div>
        </DashboardLayout>
    );
}

export default ManagerDevicePage;
