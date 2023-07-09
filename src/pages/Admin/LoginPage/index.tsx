import { Col, Row } from "antd";
import Input from "../../../components/input/CustomInput";
import "./login.scss";
import images from "../../../assests/images";
import CustomButton from "../../../components/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RootState, AppDispatch } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { fetchUsers } from "../../../redux/reducers/UserInfo";
import { addDays, format } from "date-fns";
import { addDiary } from "../../../redux/reducers/diary";

interface Diary{
    userName: string,
    IP: string,
    handle: string,
    time: string
}

function Login() {
    const [stateLogin, setStateLogin] = useState(true);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(["accessToken"]);
    const [diary, setDiary] = useCookies(["Diary"]);
    const [ipAddress, setIPAddress] = useState("");

    

    const dispatch = useDispatch<AppDispatch>();

    const { data, loading, error } = useSelector(
        (state: RootState) => state.usersInfo
    );

    const { data: diaryData} = useSelector(
        (state: RootState) => state.diary
    );


    useEffect(() => {
        const getIPAddress = async () => {
            try {
                const response = await fetch(
                    "https://api.ipify.org/?format=json"
                );
                const data = await response.json();
                const ipAddress = data.ip;
                setIPAddress(ipAddress);
            } catch (error) {
                console.error(error);
            }
        };

        getIPAddress();
    }, []);

    ////get data
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const LoginSubmit =  async() => {
        const result = data.find(
            (value) =>
                value.userName === userName &&
                value.password === password &&
                value.role === "admin"
        );

        if (result) {
            const accessToken = { ...result, stateActive: "Hoạt động" };
            setCookie("accessToken", accessToken, { path: "/" });

            const date = new Date();
            const time = `${format(date, "dd/MM/yy")}   ${format(
                date,
                "HH:mm:ss"
            )}`;

            setDiary(
                "Diary",
                { userName: result.userName, time: time, IP: ipAddress, handle: '' },
                { path: "/" }
            );

            if(diary.Diary) {

                await  dispatch(addDiary(diary.Diary as Diary))
            }
                
            window.location.href = "/dashboard";
        } else {
            setStateLogin(false);
        }

    };

    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") LoginSubmit();
    });

    return (
        <div className="wrapper">
            <Row className="Row">
                <Col
                    className="login__handle"
                    span={10}
                    style={{ backgroundColor: "#f6f6f6" }}
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
                    <div className="login__img-text">
                        <p
                            style={{
                                fontWeight: 400,
                                fontSize: "38px",
                                lineHeight: "51px",
                                color: "#FF7506",
                            }}
                        >
                            Hệ thống
                        </p>
                        <p
                            style={{
                                color: "#FF7506",
                                fontWeight: 900,
                                fontSize: "42px",
                                lineHeight: "70px",
                                textTransform: "uppercase",
                            }}
                        >
                            Quản lý xếp hàng
                        </p>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Login;
