import { Space } from "antd";
import images from "../../assests/images";
import "./User.scss";
import { Link } from "react-router-dom";
import DropDown from "../../components/DropDown";
import CustomButton from "../../components/button";
import CustomInput from "../../components/input/CustomInput";
import { notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { addNumber, fetchNumber } from "../../redux/reducers/number";
import { addDays, format } from "date-fns";

type NotificationType = "success" | "info" | "warning" | "error";

function UserPage() {
    const dispatch = useDispatch<AppDispatch>();

    const { data } = useSelector((state: RootState) => state.number);
    useEffect(() => {
        dispatch(fetchNumber());
    }, [dispatch]);

    const [modalInput, setModalInput] = useState({} as any);
    const [stateModal, setStateModal] = useState(false);
    const [stateNumber, setStateNumber] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    console.log(modalInput);

    var typeNoti: NotificationType;

    if (
        modalInput.name === undefined ||
        modalInput.SDT === undefined ||
        modalInput.name === "" ||
        modalInput.SDT === ""
    ) {
        typeNoti = "warning";
    } else {
        typeNoti = "success";
    }

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
                message: "Cấp số thành công",
            });
        }
    };

    const addNumbers = (type: NotificationType) => {
        if (type === "success") {
            const STT = String(data.length + 1).padStart(7, "0");
            const date = new Date();
            const futureDate = addDays(date, 5);
            const time = `${format(date, "HH:mm")} - ${format(
                date,
                "dd/MM/yy"
            )}`;
            const expiry = `${format(date, "HH:mm")} - ${format(
                futureDate,
                "dd/MM/yy"
            )}`;

            setModalInput({
                STT: STT,
                time: time,
                expiry: expiry,
                source: "Khách hàng",
                state: "Đang chờ",
                nameClient: modalInput.name,
                nameService: modalInput.service,
            });

            dispatch(
                addNumber({
                    STT: STT,
                    time: time,
                    expiry: expiry,
                    source: "Khách hàng",
                    state: "Đang chờ",
                    nameClient: modalInput.name,
                    nameService: modalInput.service,
                })
            );
        }
        openNotification(type);
    };

    const MenuItem = [
        {
            path: "/number",
            icon: images.menu_number.default,
            text: "Cấp số",
            iconActive: images.numberActive.default,
        },
    ];

    return (
        <div className="wrapper-user">
            {contextHolder}
            <div className="user-menu">
                <img src={`${images.logo}`} alt="" className="logo-menu" />

                <div className="menu-items">
                    <Space direction="vertical" style={{ width: "100%" }}>
                        {MenuItem.map((value, index) => (
                            <Link
                                to=""
                                className="menu-item active"
                                key={index}
                            >
                                <img src={value.iconActive} alt="" />
                                <p>{value.text}</p>
                            </Link>
                        ))}
                    </Space>
                </div>
            </div>
            <div className="user-content">
                <div className="user-content__header">
                    <div className="title">Quản lý cấp số</div>
                    <Link to="/login">Đăng nhập-Admin</Link>
                </div>
                <div className="wrapper">
                    <div className="user-content__heading">CẤP SỐ MỚI</div>
                    <div className="user-content__description">
                        Dịch vụ khách hàng lựa chọn
                    </div>
                    <div className="user-content__dropdown">
                        <DropDown
                            type="service"
                            label=""
                            placeholder="Chọn dịch vụ"
                            onClick={(e) =>
                                setModalInput({ ...modalInput, service: e })
                            }
                        />
                    </div>
                    <CustomButton
                        text="Xác nhận"
                        type="BtnDefault"
                        onClick={() => {
                            modalInput.service && setStateModal(true);
                        }}
                    />
                </div>
            </div>

            {stateModal && (
                <div className="user-modal">
                    {!stateNumber && (
                        <div className="user-modal__content">
                            <div className="heading">
                                Điền thông tin của bạn
                            </div>
                            <CustomInput
                                label="Họ và tên"
                                request
                                placeholder="Nhập họ và tên của bạn"
                                type="text"
                                value={modalInput.name}
                                onChange={(e) =>
                                    setModalInput({
                                        ...modalInput,
                                        name: e.target.value,
                                    })
                                }
                            />

                            <CustomInput
                                label="Số điện thoại"
                                request
                                placeholder="Nhập số điện thoại của bạn"
                                type="text"
                                value={modalInput.SDT}
                                onChange={(e) =>
                                    setModalInput({
                                        ...modalInput,
                                        SDT: e.target.value,
                                    })
                                }
                            />

                            <CustomInput
                                label="Email"
                                placeholder="Nhập email của bạn"
                                type="email"
                            />
                            <p style={{ fontSize: "16px", color: "#7E7D88" }}>
                                <span className="require">* </span>Là trường
                                thông tin bắt buộc
                            </p>

                            <div className="modal-btn">
                                <div className="modal-btn__item ">
                                    <CustomButton
                                        text="Hủy bỏ"
                                        type="BtnOutline"
                                        onClick={() => setStateModal(false)}
                                    />
                                </div>
                                <div className="modal-btn__item">
                                    <CustomButton
                                        text="Xác nhận"
                                        type="BtnDefault"
                                        onClick={() => {
                                            addNumbers(typeNoti);
                                            setStateNumber(true);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {stateNumber && (
                        <div className="content">
                            <img
                                src={images.cancel.default}
                                alt=""
                                className="icon-cancel"
                                onClick={() => {
                                    setStateModal(false);
                                    setStateNumber(false);
                                }}
                            />

                            <div className="content-description">
                                <div className="heading">
                                    Số thứ tự được cấp
                                </div>
                                <div className="number">{modalInput.STT}</div>
                                <div className="positon">
                                    DV:{modalInput.nameService}
                                    <span>(tại quầy số 1)</span>
                                </div>
                            </div>
                            <div className="content-time">
                                <div className="time-grant">
                                    Thời gian cấp: {modalInput.time}
                                </div>
                                <div className="time-expiry">
                                    Hạn sử dụng: {modalInput.expiry}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserPage;
