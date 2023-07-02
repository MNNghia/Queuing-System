import './AddAccount.scss'
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import CustomButton from "../../../components/button";
import DropDown from "../../../components/DropDown";
import CustomInput from "../../../components/input/CustomInput";
import { Row, Col } from 'antd';
import { notification } from "antd";
import { addUser, fetchUsers } from '../../../redux/reducers/UserInfo';
import { useSelector } from 'react-redux';


interface User {
    id?: any;
    userName: string;
    password: string;
    name: string,
    phone: string,
    role: string,
    email: string,
    avatar: string
    stateAction: string
}

type NotificationType = "success" | "info" | "warning" | "error";

function AddAccountPage() {

    const [api, contextHolder] = notification.useNotification();

    const [acc, setAcc] = useState({stateAction: "Hoạt động"} as User)
    const [rePassword, setRePassword] = useState('')

    const dispatch = useDispatch<AppDispatch>();

    const { data, loading, error } = useSelector(
        (state: RootState) => state.usersInfo
    );

    ////get data
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);


    useEffect(() => {
        const userName = data.find(value => value.userName === acc.userName)
        if(userName) {
            typeNoti = 'info'
        }
    }, [acc.userName, data])

    ///add data
    const handleAddUser = (type: NotificationType) => {
        if (typeNoti === "success") {

            dispatch(addUser(acc));
        }
        openNotification(type);
    };

    

    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "CCài đặt hệ thống", url: "" },
            { label: "Quản lý tài khoản", url: "/settingSystem/accountManage" },
            { label: "Thêm tài khoản", url: "/settingSystem/accountManage/addAccount" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);

    var typeNoti: NotificationType;

    if (
        acc.name === undefined ||
        acc.email === undefined ||
        acc.phone === undefined ||
        acc.role === undefined ||
        acc.password === undefined ||
        acc.stateAction === undefined ||
        acc.userName=== undefined ||
        acc.name === '' ||
        acc.email === ''||
        acc.phone === '' ||
        acc.role === '' ||
        acc.password === '' ||
        acc.stateAction === '' ||
        acc.userName=== '' 
    ) {
        typeNoti = "warning";
    } else if(acc.password !== rePassword){
        typeNoti = "error"
    }  else {
        typeNoti = "success";
    }

    const key = "updatable";

    const openNotification = (type: NotificationType) => {
        if(type === 'warning'){
            api.warning({
                key,
                message: "Trường dữ liệu bắt buộc không được để trống",
            });
        }
        if(type === 'success') {
            api.success({
                key,
                message: 'Thêm vai tài khoản thành công',
            })
        }
        if(type === 'error') {
            api.error({
                key,
                message: 'Nhập lại mật khẩu không hợp lệ',
            })
        }
        if(type === 'info') {
            api.info({
                key,
                message: 'Tên tài khoản đã tồn tại',
            })
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
                                        label="Họ tên:"
                                        type="text"
                                        request
                                        placeholder="Nhập họ tên"
                                        onChange={(e) => setAcc({...acc, name: e.target.value})}
                                        value = {acc.name}
                                    />
                                    <CustomInput
                                        label="Số điện thoại:"
                                        type="text"
                                        request
                                        placeholder="Nhập số điện thoại"
                                        onChange={(e) => setAcc({...acc, phone: e.target.value})}
                                        value = {acc.phone}
                                    />
                                    <CustomInput
                                        label="Email:"
                                        type="text"
                                        request
                                        placeholder="Nhập email"
                                        onChange={(e) => setAcc({...acc, email: e.target.value})}
                                        value = {acc.email}
                                    />
                                    <div
                                        className=""
                                        
                                    >
                                        <DropDown
                                            type="roleAdd"
                                            label="Loại thiết bị:"
                                            placeholder="Chọn vai trò"
                                            require
                                            onClick={(e) => setAcc({...acc, role: e})}
                                        value = {acc.role}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div
                                    className="device-info__items"
                                    style={{ float: "right" }}
                                >
                                    <CustomInput
                                        label="Tên đăng nhập:"
                                        type="text"
                                        request
                                        placeholder="Nhập tên đăng nhập"
                                        onChange={(e) => setAcc({...acc, userName: e.target.value})}
                                        value = {acc.userName}
                                    />
                                    <CustomInput
                                        label="Mật khẩu:"
                                        type="password"
                                        request
                                        placeholder="Nhập mật khẩu"
                                        onChange={(e) => setAcc({...acc, password: e.target.value})}
                                        value = {acc.password}
                                    />
                                    <CustomInput
                                        label="Nhập lại mật khẩu:"
                                        type="password"
                                        request
                                        placeholder="Nhập lại mật khẩu"
                                        onChange={(e) => setRePassword(e.target.value)}
                                        value={rePassword}
                                    />
                                    <div
                                        className=""
                                        style={{ marginBottom: "32px" }}
                                    >
                                        <DropDown
                                            type="stateActiveAdd"
                                            label="Tình trạng"
                                            require
                                            onClick={(e) => setAcc({...acc, stateAction: e})}
                                        value = {acc.stateAction}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <p
                                style={{
                                    fontSize: "16px",
                                    lineHeight: "21px",
                                    color: "#7E7D88",
                                    paddingTop: "20px",
                                }}
                            >
                                {" "}
                                <span className="require">*</span> là trường
                                thông tin bắt buộc
                            </p>
                        </Row>
                    </div>
                </div>

                <div className="wrapper-managerDevice__btn">
                    <CustomButton type="BtnOutline" text="Hủy bỏ" onClick={() => {window.history.back()}}/>
                    <CustomButton type="BtnDefault" text="Thêm" onClick={() => handleAddUser(typeNoti)} />
                </div>
            </div>
    );
}

export default AddAccountPage