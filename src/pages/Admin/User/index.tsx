import "./User.scss";
import DashboardLayout from "../../../layouts/Admin";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useEffect, useState } from "react";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../../redux/reducers/Breadcrumb/Breadcrumb";
import { Row, Col } from "antd";
import images from "../../../assests/images";
import CustomInput from "../../../components/input/CustomInput";

function User() {
    const dispatch = useDispatch<AppDispatch>();

    //breadcrum User page
    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Thông tin cá nhân", url: "/user" },
        ];

        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);

    return (
            <div className="wrapper-userInfo">
                <Row style={{ gap: "24px" }}>
                    <Col span={6}>
                        <div className="userInfo-items">
                            <div className="userInfo-item__avatar">
                                <img
                                    src="https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg"
                                    alt=""
                                />
                                <div className="userInfo-item__icon-camera">
                                    <img src={images.camera.default} alt="" />
                                </div>
                            </div>
                            <div className="userInfo-item__name">
                                Nguyễn Minh Nghĩa
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="userInfo-input">
                            <CustomInput
                                type="disabled"
                                label="Tên người dùng"
                                disabledValue="Nguyễn Minh Nghĩa"
                                style={{
                                    width: "100%",
                                    fontWeight: 400,
                                    fontSize: "18px",
                                    lineHeight: "24px",
                                    color: "rgba(83,82,97, 0.5)",
                                    cursor: "default",
                                    border: 'none',
                                    backgroundColor: '#EAEAEC'
                                }}
                            />
                            <CustomInput
                                type="disabled"
                                label="Tên người dùng"
                                disabledValue="Nguyễn Minh Nghĩa"
                                style={{
                                    width: "100%",
                                    fontWeight: 400,
                                    fontSize: "18px",
                                    lineHeight: "24px",
                                    color: "rgba(83,82,97, 0.5)",
                                    cursor: "default",
                                    border: 'none',
                                    backgroundColor: '#EAEAEC'
                                }}
                            />
                            <CustomInput
                                type="disabled"
                                label="Tên người dùng"
                                disabledValue="Nguyễn Minh Nghĩa"
                                style={{
                                    width: "100%",
                                    fontWeight: 400,
                                    fontSize: "18px",
                                    lineHeight: "24px",
                                    color: "rgba(83,82,97, 0.5)",
                                    cursor: "default",
                                    border: 'none',
                                    backgroundColor: '#EAEAEC'
                                }}
                            />
                            
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="userInfo-input">
                             <CustomInput
                                type="disabled"
                                label="Tên người dùng"
                                disabledValue="Nguyễn Minh Nghĩa"
                                style={{
                                    width: "100%",
                                    fontWeight: 400,
                                    fontSize: "18px",
                                    lineHeight: "24px",
                                    color: "rgba(83,82,97, 0.5)",
                                    cursor: "default",
                                    border: 'none',
                                    backgroundColor: '#EAEAEC'
                                }}
                            />
                            <CustomInput
                                type="disabled"
                                label="Tên người dùng"
                                disabledValue="Nguyễn Minh Nghĩa"
                                style={{
                                    width: "100%",
                                    fontWeight: 400,
                                    fontSize: "18px",
                                    lineHeight: "24px",
                                    color: "rgba(83,82,97, 0.5)",
                                    cursor: "default",
                                    border: 'none',
                                    backgroundColor: '#EAEAEC'
                                }}
                            />
                            <CustomInput
                                type="disabled"
                                label="Tên người dùng"
                                disabledValue="Nguyễn Minh Nghĩa"
                                style={{
                                    width: "100%",
                                    fontWeight: 400,
                                    fontSize: "18px",
                                    lineHeight: "24px",
                                    color: "rgba(83,82,97, 0.5)",
                                    cursor: "default",
                                    border: 'none',
                                    backgroundColor: '#EAEAEC'
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
    );
}

export default User;
