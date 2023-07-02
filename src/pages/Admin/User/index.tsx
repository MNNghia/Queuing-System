import "./User.scss";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../../redux/reducers/Breadcrumb/Breadcrumb";
import { Row, Col } from "antd";
import images from "../../../assests/images";
import CustomInput from "../../../components/input/CustomInput";
import { useCookies } from 'react-cookie';



interface User {
    id: any;
    userName: string;
    password: string;
    permission: string;
    name: string,
    phone: string,
    role: string,
    email: string
}

function User() {
    const dispatch = useDispatch<AppDispatch>();

    const [userInfo, setUserInfo] = useState({} as  User)
        const [cookies] = useCookies(['accessToken']);

    const {name, avatar, email, phone, role, userName, password} = cookies.accessToken

    //breadcrum User page
    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Thông tin cá nhân", url: "/user" },
        ];

        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);

    return (
            <div className="wrapper-userInfo">
                {
                    cookies.accessToken && 
                <Row style={{ gap: "24px" }}>
                    <Col span={6}>
                        <div className="userInfo-items">
                            <div className="userInfo-item__avatar">
                                <img
                                    src={avatar}
                                    alt=""
                                />
                                <div className="userInfo-item__icon-camera">
                                    <img src={images.camera.default} alt="" />
                                </div>
                            </div>
                            <div className="userInfo-item__name">
                                {name}
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="userInfo-input">
                            <CustomInput
                                type="disabled"
                                label="Tên người dùng"
                                disabledValue={name}
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
                                label="Số điện thoại"
                                disabledValue= {phone}
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
                                label="Email:"
                                disabledValue= {email}
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
                                label="Tên đăng nhập"
                                disabledValue= {userName}
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
                                label="Mật khẩu"
                                disabledValue= {password}
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
                                label="Vai trò"
                                disabledValue= {role}
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
                }
            </div>
    );
}

export default User;
