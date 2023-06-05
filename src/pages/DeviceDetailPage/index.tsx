import './DeviceDetailPage.scss'
import DashboardLayout from "../../layouts/Dashboard/DashboardLayout";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { Row, Col } from 'antd';
import {Link} from 'react-router-dom'
import images from '../../assests/images';

function DeviceDetailPage() {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Thiết bị", url: "" },
            { label: "Danh sách thiết bị", url: "/device/listDevice" },
            { label: "Chi tiết thiết bị", url: "/device/listDevice/detailDevice" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);

    return (  
        <DashboardLayout>
            <div className="wrapper-DeviceDetail">
                <div className="title">Quản lý thiết bị</div>
                <div className="wrapper-DeviceDetail__content">
                    <div className="title" style={{ fontSize: "20px" }}>
                        Thông tin thiết bị
                    </div>
                    <div className="DeviceDetail-info">
                        <Row>
                            <Col span={12}>
                                <div className="DeviceDetail-info__items">
                                    <div className="DeviceDetail-info__item">
                                        <p className="key">Mã thiết bị:</p>
                                        <p className="value">KIO_01</p>
                                    </div>
                                    <div className="DeviceDetail-info__item">
                                        <p className="key">Tên thiết bị:</p>
                                        <p className="value">Kiosk</p>
                                    </div>
                                    <div className="DeviceDetail-info__item">
                                        <p className="key">Địa chỉ IP:</p>
                                        <p className="value">128.172.308</p>
                                    </div>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="DeviceDetail-info__items">
                                    <div className="DeviceDetail-info__item">
                                        <p className="key">Loại thiết bị:</p>
                                        <p className="value">Kiosk</p>
                                    </div>
                                    <div className="DeviceDetail-info__item">
                                        <p className="key">Tên đăng nhập:</p>
                                        <p className="value">Kiosk</p>
                                    </div>
                                    <div className="DeviceDetail-info__item">
                                        <p className="key">Mật khẩu:</p>
                                        <p className="value">CMS</p>
                                    </div>
                                </div>
                            </Col>
                            <Col span={24} style={{padding: '10px 0px'}}>
                                <p className="key">Dịch vụ sử dụng: </p>
                                <p className="value">Khám tim mạch, Khám sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát.</p>
                            </Col>
                        </Row>
                    </div>
                    <Link to="/device/listDevice/addDevice" className="button-add" style={{top: '200px'}}>
                        <img src={images.deviceUpdata.default} alt="" /><br/>
                        Cập nhật thiết bị
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default DeviceDetailPage;