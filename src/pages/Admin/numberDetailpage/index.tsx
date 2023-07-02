/* eslint-disable array-callback-return */

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
import { fetchNumber } from "../../../redux/reducers/number";

function NumberDetailPage() {
    const dispatch = useDispatch<AppDispatch>();

    const { data, loading, error } = useSelector(
        (state: RootState) => state.number
    );

    const urlParams = new URLSearchParams(window.location.search);
    const numberId = urlParams.get("numberId");

    ////get data
    useEffect(() => {
        dispatch(fetchNumber());
    }, [dispatch]);

    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Thiết bị", url: "" },
            { label: "Danh sách cấp số", url: "/number" },
            {
                label: "Chi tiết thiết bị",
                url: "/number/numberDetail",
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
                        if (value.id === numberId) {
                            return (
                                <Row key={index}>
                                    <Col span={12}>
                                        <div className="DeviceDetail-info__items">
                                            <div className="DeviceDetail-info__item">
                                                <p className="key">Họ tên:</p>
                                                <p className="value">
                                                    {value.nameClient}
                                                </p>
                                            </div>
                                            <div className="DeviceDetail-info__item">
                                                <p className="key">
                                                    Tên dịch vụ:
                                                </p>
                                                <p className="value">
                                                    {value.nameService}
                                                </p>
                                            </div>
                                            <div className="DeviceDetail-info__item">
                                                <p className="key">
                                                    Số thứ tự:
                                                </p>
                                                <p className="value">
                                                    {value.STT}
                                                </p>
                                            </div>
                                            <div className="DeviceDetail-info__item">
                                                <p className="key">
                                                    Thời gian cấp:
                                                </p>
                                                <p className="value">
                                                    {value.time}
                                                </p>
                                            </div>
                                            <div className="DeviceDetail-info__item">
                                                <p className="key">
                                                    Hạn sử dụng:
                                                </p>
                                                <p className="value">
                                                    {value.expiry}
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className="DeviceDetail-info__items">
                                            <div className="DeviceDetail-info__item">
                                                <p className="key">
                                                    Nguồn cấp:
                                                </p>
                                                <p className="value">
                                                    {value.source}
                                                </p>
                                            </div>
                                            <div className="DeviceDetail-info__item">
                                                <p className="key">
                                                    Trạng thái:
                                                </p>
                                                <p
                                                    className="value"
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "5px",
                                                    }}
                                                >
                                                    <img
                                                        src={
                                                            value.state ===
                                                            "Đang chờ"
                                                                ? images.waiting
                                                                      .default
                                                                : value.state ===
                                                                  "Bỏ qua"
                                                                ? images.skip
                                                                      .default
                                                                : images.used
                                                                      .default
                                                        }
                                                        alt=""
                                                    />{" "}
                                                    {value.state}
                                                </p>
                                            </div>
                                            <div className="DeviceDetail-info__item">
                                                <p className="key">
                                                    Số điện thoại:
                                                </p>
                                                <p className="value">12343</p>
                                            </div>
                                            <div className="DeviceDetail-info__item">
                                                <p className="key">
                                                    Địa chỉ email:
                                                </p>
                                                <p className="value">
                                                    email@gmail.com
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            );
                        }
                    })}
                </div>
                <Link
                    to=""
                    className="button-add"
                    style={{ top: "200px" }}
                    onClick={() => {
                        window.history.back();
                    }}
                >
                    <img src={images.comeBack.default} alt="" />
                    <br />
                    Quay lại
                </Link>
            </div>
        </div>
    );
}

export default NumberDetailPage;
