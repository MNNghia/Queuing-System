import { Col, Row, Space } from "antd";
import Input from "../../components/input/CustomInput";
import images from "../../assests/images";
import CustomButton from "../../components/button";
import "./resetPasswordPage.scss";
import { useState } from "react";

function ResetPasswordPage() {
    const [email, setEmail] = useState("");
    const [changePassword, setChangePassword] = useState(false);

    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const checkEmail: any = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(emailRegex.test(email)){
            setChangePassword(true)
        }
    }

    return (
        <div className="wrapper-reset">
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

                                <CustomButton
                                    text="Xác nhận"
                                    type="BtnDefault"
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
                                <div className="resetPasswordBtn">
                                    <CustomButton
                                        text="Hủy"
                                        type="BtnOutline"
                                        onClick={() => {window.history.back()}}
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
