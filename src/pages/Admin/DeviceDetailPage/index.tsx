/* eslint-disable array-callback-return */
import "./DeviceDetailPage.scss";
import DashboardLayout from "../../../layouts/Admin";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import images from "../../../assests/images";
import { useSelector } from "react-redux";
import { fetchDevice } from "../../../redux/reducers/device";

function DeviceDetailPage() {
    const dispatch = useDispatch<AppDispatch>();

    const { data, loading, error } = useSelector(
        (state: RootState) => state.device
    );

    const urlParams = new URLSearchParams(window.location.search);
    const deviceId = urlParams.get('deviceId');

    ////get data
    useEffect(() => {
        dispatch(fetchDevice());
    }, [dispatch]);

    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Thiết bị", url: "" },
            { label: "Danh sách thiết bị", url: "/device/listDevice" },
            {
                label: "Chi tiết thiết bị",
                url: "/device/listDevice/detailDevice",
            },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);

    return (
        <div className="wrapper-DeviceDetail">
            <div className="title">Quản lý thiết bị</div>
            <div className="wrapper-DeviceDetail__content">
                <div className="title" style={{ fontSize: "20px" }}>
                    Thông tin thiết bị
                </div>
                <div className="DeviceDetail-info">
                    {data.map((value, index) => {
                        if(value.id === deviceId){
                        return <Row key={index}>
                            <Col span={12}>
                                <div className="DeviceDetail-info__items">
                                    <div className="DeviceDetail-info__item">
                                        <p className="key">Mã thiết bị</p>
                                        <p className="value">{value.idDevice}</p>
                                    </div>
                                    <div className="DeviceDetail-info__item">
                                        <p className="key">Tên thiết bị:</p>
                                        <p className="value">{value.nameDevice}</p>
                                    </div>
                                    <div className="DeviceDetail-info__item">
                                        <p className="key">Địa chỉ IP:</p>
                                        <p className="value">{value.ipAddress}</p>
                                    </div>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="DeviceDetail-info__items">
                                    <div className="DeviceDetail-info__item">
                                        <p className="key">Loại thiết bị:</p>
                                        <p className="value">{value.typeDevice}</p>
                                    </div>
                                    <div className="DeviceDetail-info__item">
                                        <p className="key">Tên đăng nhập:</p>
                                        <p className="value">{value.userName}</p>
                                    </div>
                                    <div className="DeviceDetail-info__item">
                                        <p className="key">Mật khẩu:</p>
                                        <p className="value">{value.password}</p>
                                    </div>
                                </div>
                            </Col>
                            <Col span={24} style={{ padding: "10px 0px" }}>
                                <p className="key">Dịch vụ sử dụng: </p>
                                <p className="value">
                                    {value.service}
                                </p>
                            </Col>
                        </Row>
                        }
})}
                </div>
                <Link
                    to={{ pathname: '/device/listDevice/updateDevice', search: `deviceId=${deviceId}`}}
                    className="button-add"
                    style={{ top: "200px" }}
                >
                    <img src={images.deviceUpdata.default} alt="" />
                    <br />
                    Cập nhật thiết bị
                </Link>
            </div>
        </div>
    );
}

export default DeviceDetailPage;
