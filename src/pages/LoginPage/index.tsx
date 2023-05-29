import { Col, Row } from "antd";
import Input from "../../components/input/CustomInput";
import "./login.scss";
import images from "../../assests/images";
import CustomButton from "../../components/button";
import {  useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUsers } from "../../redux/reducers/login/login";
import { RootState, AppDispatch } from "../../redux/store";

import { useDispatch, useSelector } from "react-redux";

function Login() {
    const [stateLogin, setStateLogin] = useState(true);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch<AppDispatch>();

    const { data, loading, error } = useSelector(
        (state: RootState) => state.users
    );

    console.log(data, loading, error);

    ////get data
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);


    const LoginSubmit = () => {
    const state = data.find(
            (value) =>
                value.userName === userName &&
                value.password === password &&
                (window.location.href = "/dashboard")
        );
        if(!state) {
            setStateLogin(false)
        }
    };

    /////add data
    // const handleAddUser = () => {
    //     const userName = prompt("Enter user name")
    //     const email = promt("enter user email")
    //     if(userName && email) {
    //         dispatch(adduser({name, email}))
    //     }
    // }

    ////delete data
    // const handleDeleteUser = (userId: string) => {
    //     if(window.confirm('Are you sure you wnat todelete this user?')) {
    //         dispatch(delete(userId))
    //     }
    // }

    // if(loading) {
    //     return <div>Loading...</div>
    // }

    // if(error) {
    //     return <div>Error: {error}</div>
    // }

    return (
        <div className="wrapper">
            <Row className="Row">
                <Col
                    className="login__handle"
                    span={10}
                    style={{ backgroundColor: "#f6f6f6"}}
                >
                    <div className="Login__logo">
                        <img src={`${images.logo}`} alt="" />
                        <form action="" className="login__form">
                            <Input
                                request
                                placeholder="Tên đăng nhập"
                                label="Tên đăng nhập"
                                type="text"
                                onChange={(e) => {
                                    setUserName(e.target.value);
                                }}
                                value={userName}
                            />
                            <Input
                                request
                                placeholder="Mật khẩu"
                                label="Mật khẩu"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />

                            {stateLogin ? (
                                <Link
                                    to="/resetPassword"
                                    className="login__forgot-password"
                                >
                                    Quên mật khẩu?
                                </Link>
                            ) : (
                                <p className="login__forgot-password ">
                                    <i
                                        className="fa-solid fa-circle-exclamation"
                                        style={{
                                            marginRight: "10px",
                                            fontSize: "18px",
                                        }}
                                    ></i>
                                    Sai mật khẩu hoặc tên đăng nhập
                                </p>
                            )}

                            <CustomButton
                                text="Đăng nhập"
                                type="BtnDefault"
                                onClick={LoginSubmit}
                            />
                            {stateLogin ? (
                                ""
                            ) : (
                                <Link
                                    to="/resetPassword"
                                    className="login__forgot-password login__forgot-password--error"
                                >
                                    Quên mật khẩu?
                                </Link>
                            )}
                        </form>
                    </div>
                </Col>
                <Col className="login__img" span={14}>
                    <img src={images.group} alt="" />
                </Col>
            </Row>
        </div>
    );
}

export default Login;
