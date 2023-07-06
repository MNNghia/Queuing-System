import "./ManagaerDevicePage.scss";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DropDown from "../../../components/DropDown";
import CustomInput from "../../../components/input/CustomInput";
import { Col, Row, Select } from "antd";
import type { SelectProps } from "antd";
import CustomButton from "../../../components/button";
import { AppDispatch, RootState } from "../../../redux/store";
import { addDevice, fetchDevice } from "../../../redux/reducers/device";
import { notification } from "antd";
import { useSelector } from "react-redux";

const options: SelectProps["options"] = [];

interface Device {
    idDevice: string;
    nameDevice: string;
    ipAddress: string;
    stateAction: boolean;
    stateConnect: boolean;
    service: string;
    typeDevice: string;
    userName: string;
    password: string;
}

type NotificationType = "success" | "info" | "warning" | "error";

function ManagerDevicePage() {
    const [device, setDevice] = useState({} as Device);

    const [api, contextHolder] = notification.useNotification();

    const dispatch = useDispatch<AppDispatch>();

    const { data, loading, error } = useSelector(
        (state: RootState) => state.device
    );

    ////get data
    useEffect(() => {
        dispatch(fetchDevice());
    }, [dispatch]);

    var typeNoti: NotificationType;

    if (
        device.idDevice === undefined ||
        device.nameDevice === undefined ||
        device.ipAddress === undefined ||
        device.service === undefined ||
        device.typeDevice === undefined ||
        device.userName === undefined ||
        device.password === undefined ||
        device.idDevice === "" ||
        device.nameDevice === "" ||
        device.ipAddress === "" ||
        device.service === "" ||
        device.typeDevice === "" ||
        device.userName === "" ||
        device.password === ""
    ) {
        typeNoti = "warning";
    } 

    ///add data
    const handleAddDevice = (type: NotificationType) => {
        if (typeNoti === "success") {
            dispatch(addDevice(device));
            setDevice({} as Device);
        }

        openNotification(type);
    };

    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Thiết bị", url: "" },
            { label: "Danh sách thiết bị", url: "/device/listDevice" },
            { label: "Thêm thiết bị", url: "/device/listDevice/addDevice" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);

    const key = "updatable";

    const openNotification = (type: NotificationType) => {
        if (type === "warning") {
            api.warning({
                key,
                message: "Trường dữ liệu bắt buộc không được để trống",
            });
        }
        if (type === "success") {
            api.success({
                key,
                message: "Thêm thiết bị thành công",
            });
        }
        if (type === "info") {
            api.info({
                key,
                message: "Mã thiết bị đã tồn tại",
            });
        }
    };

    return (
        <div className="wrapper-managerDevice">
            {contextHolder}
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
                                    onChange={(e) => {
                                        setDevice({
                                            ...device,
                                            idDevice: e.target.value.trim(),
                                        });
                                    }}
                                    value={device.idDevice}
                                />
                                <CustomInput
                                    label="Tên thiết bị:"
                                    type="text"
                                    request
                                    placeholder="Nhập mã thiết bị"
                                    onChange={(e) => {
                                        setDevice({
                                            ...device,
                                            nameDevice: e.target.value.trim(),
                                        });
                                    }}
                                    value={device.nameDevice}
                                />
                                <CustomInput
                                    label="Địa chỉ IP:"
                                    type="text"
                                    request
                                    placeholder="Nhập mã thiết bị"
                                    onChange={(e) => {
                                        setDevice({
                                            ...device,
                                            ipAddress: e.target.value.trim(),
                                        });
                                    }}
                                    value={device.ipAddress}
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
                                        onClick={(value: any) =>
                                            setDevice({
                                                ...device,
                                                typeDevice: value,
                                            })
                                        }
                                    />
                                </div>
                                <CustomInput
                                    label="Tên đăng nhập:"
                                    type="text"
                                    request
                                    placeholder="Nhập tài khoản "
                                    onChange={(e) => {
                                        setDevice({
                                            ...device,
                                            userName: e.target.value.trim(),
                                        });
                                    }}
                                    value={device.userName}
                                />
                                <CustomInput
                                    label="Mật khẩu:"
                                    type="text"
                                    request
                                    placeholder="Nhập mật khẩu"
                                    onChange={(e) => {
                                        setDevice({
                                            ...device,
                                            password: e.target.value.trim(),
                                        });
                                    }}
                                    value={device.password}
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
                                    display: "inline-block",
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
                                onChange={(value) =>
                                    setDevice({ ...device, service: value })
                                }
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
                            <span className="require">*</span> là trường thông
                            tin bắt buộc
                        </p>
                    </Row>
                </div>
            </div>

            <div className="wrapper-managerDevice__btn">
                <CustomButton
                    type="BtnOutline"
                    text="Hủy bỏ"
                    onClick={() => {
                        window.history.back();
                    }}
                />
                <CustomButton
                    type="BtnDefault"
                    text="Cập nhật"
                    onClick={() => handleAddDevice(typeNoti)}
                />
            </div>
        </div>
    );
}

export default ManagerDevicePage;
