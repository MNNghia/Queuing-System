import { Col, Row } from "antd";
import Input from "../../../components/input/CustomInput";
import images from "../../../assests/images";
import CustomButton from "../../../components/button";
import "./resetPasswordPage.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { fetchUsers, updateUser } from "../../../redux/reducers/UserInfo";
import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

function ResetPasswordPage() {
    const [email, setEmail] = useState("");
    const [emailVali, setEmailVali] = useState(true);
    const [changePassword, setChangePassword] = useState(false);
    const [user, setUser] = useState({} as any)

    const [api, contextHolder] = notification.useNotification();

    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const dispatch = useDispatch<AppDispatch>();

    const { data, loading, error } = useSelector(
        (state: RootState) => state.usersInfo
    );

     ////get data
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const checkEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const result = data.find((value) => value.email === email);
        if (result && (emailRegex.test(email))) {
                setUser(result)
                setEmailVali(true)
                setChangePassword(true);
        } else {
            setEmailVali(false);
        }
    };

    const resetPassword = () => {
        if(password === repeatPassword && password.length >= 6) {
            setEmailVali(true)
            dispatch(updateUser({...user, password: password, stateAction: ''}));
            openNotification('success')
            setPassword('')
            setRepeatPassword('')
        } else {
            setEmailVali(false)
        }
    }

    const key = "updatable";

    const openNotification = (type: NotificationType) => {
        if (type === "success") {
            api.success({
                key,
                message: "Đặt lại mật khẩu thành công",
            });
        }
    };

    document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Ngăn chặn reload trang
    }
});
    return (
        <div className="wrapper-reset">
            {contextHolder}
            <Row className="Row">
                <Col
                    className="login__handle"
                    span={10}
                    style={{ backgroundColor: "#f6f6f6" }}
                >
                    <div className="Login__logo">
                        <img src={`${images.logo}`} alt="" />

                        {changePassword ? (
                            <form action="" className="login__form">
                                <h3 className="form-reset__title">
                                    Đặt lại mật khẩu mới
                                </h3>
                                <Input
                                    placeholder="Nhập mật khẩu mới"
                                    label="Mật khẩu"
                                    type="password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    value={password}
                                />
                                <Input
                                    placeholder="Nhập lại mật khẩu"
                                    label="Nhập lại mật khẩu"
                                    type="password"
                                    onChange={(e) => {
                                        setRepeatPassword(e.target.value);
                                    }}
                                    value={repeatPassword}
                                />

                                {emailVali ? (
                                    ""
                                ) : (
                                    <p className="login__forgot-password ">
                                        <i
                                            className="fa-solid fa-circle-exclamation"
                                            style={{
                                                marginRight: "10px",
                                                fontSize: "18px",
                                            }}
                                        ></i>
                                        Password không trùng khớp hoặc ít hơn 6 kí tự
                                    </p>
                                )}

                                <CustomButton
                                    text="Xác nhận"
                                    type="BtnDefault"
                                    onClick={resetPassword}
                                />
                            </form>
                        ) : (
                            <form action="" className="login__form">
                                <h3 className="form-reset__title">
                                    Đặt lại mật khẩu
                                </h3>
                                <Input
                                    request
                                    placeholder="Nhập email của bạn"
                                    label="Vui lòng nhập email để đặt lại mật khẩu của bạn"
                                    type="text"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    value={email}
                                />
                                {emailVali ? (
                                    ""
                                ) : (
                                    <p className="login__forgot-password ">
                                        <i
                                            className="fa-solid fa-circle-exclamation"
                                            style={{
                                                marginRight: "10px",
                                                fontSize: "18px",
                                            }}
                                        ></i>
                                        Email không hợp lệ
                                    </p>
                                )}
                                <div className="resetPasswordBtn">
                                    <CustomButton
                                        text="Hủy"
                                        type="BtnOutline"
                                        onClick={() => {
                                            window.history.back();
                                        }}
                                    />
                                    <CustomButton
                                        text="Tiếp tục"
                                        type="BtnDefault"
                                        onClick={checkEmail}
                                    />
                                </div>
                            </form>
                        )}
                    </div>
                </Col>
                <Col className="login__img" span={14}>
                    <img src={images.frame} alt="" />
                </Col>
            </Row>
        </div>
    );
}

export default ResetPasswordPage;
