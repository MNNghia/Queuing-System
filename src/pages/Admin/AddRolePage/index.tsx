import "./AddRole.scss";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import CustomInput from "../../../components/input/CustomInput";
import CustomButton from "../../../components/button";
import { Input } from "antd";
import { notification } from "antd";
import { useSelector } from "react-redux";
import { addRole, fetchRole } from "../../../redux/reducers/role";
const { TextArea } = Input;

interface Role {
    description: any;
    nameRole: String;
    functionRole: {
        xA: boolean;
        yA: boolean;
        zA: boolean;
        xB: boolean;
        yB: boolean;
        zB: boolean;
    };
}

type NotificationType = "success" | "info" | "warning" | "error";

function AddRolePage() {
    const [role, setRole] = useState({
        functionRole: {
            xA: false,
            xB: false,
            yA: false,
            yB: false,
            zA: false,
            zB: false,
        },
    } as Role);

    const [api, contextHolder] = notification.useNotification();

    const dispatch = useDispatch<AppDispatch>();

    const { data, loading, error } = useSelector(
        (state: RootState) => state.role
    );

    ////get data
    useEffect(() => {
        dispatch(fetchRole());
    }, [dispatch]);

    //breadcrum AddRole page
    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Cài đặt hệ thống", url: "" },
            { label: "Quản lý vai trò", url: "/settingSystem/roleManage" },
            { label: "Thêm vai trò", url: "/settingSystem/roleManage/addRole" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);

    const handleCheckboxChange = (event: any) => {
        const { name, checked } = event.target;
        if (name === "allA") {
            setRole((prev) => ({
                ...prev,
                functionRole: {
                    ...prev.functionRole,
                    xA: checked,
                    yA: checked,
                    zA: checked,
                },
            }));
        } else if(name === 'allB') {
            setRole((prev) => ({
                ...prev,
                functionRole: {
                    ...prev.functionRole,
                    xB: checked,
                    yB: checked,
                    zB: checked,
                },
            }));
        } else {
            setRole((prev) => ({
                ...prev,
                functionRole: {
                    ...prev.functionRole,
                    [name]: checked,
                },
            }));
        }
    };

    var typeNoti: NotificationType;

    if (
        role.description === undefined ||
        role.nameRole === undefined ||
        role.description === "" ||
        role.nameRole === ""
    ) {
        typeNoti = "warning";
    } else {
        typeNoti = "success";
    }

     ///add data
    const handleAddRole = (type: NotificationType) => {
        if (typeNoti === "success") {
            dispatch(addRole(role));
        }
        openNotification(type);
    };

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
                message: 'Thêm vai trò thành công',
            })
        }
    };

    return (
        <div className="wrapper-addRole">
            {contextHolder}
            <div className="title">Danh sách vai trò</div>
            <div className="wrapper-addRole__content">
                <div className="title" style={{ fontSize: "20px" }}>
                    Thông tin vai trò
                </div>
                <div className="content-description">
                    <div className="content-description__input-text">
                        <div className="input-text__item">
                            <CustomInput
                                label="Tên vai trò"
                                request
                                type="text"
                                placeholder="Nhập tên vai trò"
                                value={role.nameRole}
                                onChange={(e) =>
                                    setRole({
                                        ...role,
                                        nameRole: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="input-text__item">
                            <label htmlFor="" className="textarea-label">
                                Mô tả:
                            </label>
                            <TextArea
                                rows={7}
                                placeholder="Nhập mô tả:"
                                className="input-textArea"
                                onChange={(e) =>
                                    setRole({
                                        ...role,
                                        description: e.target.value,
                                    })
                                }
                                value={role.description}

                            />

                            <p className="addRole-content__node">
                                <span className="require">*</span>
                                Là trường thông tin bắt buộc
                            </p>
                        </div>
                    </div>

                    <div className="content-description__input-checkbox">
                        <div className="heading">
                            Phân quyền chức năng{" "}
                            <span className="require">*</span>
                        </div>
                        <div className="input-checkbox-content">
                            <div className="input-checkbox-content__heading">
                                Nhóm chức năng A
                            </div>
                            <div className="input-checkbox-content__group">
                                <input
                                    type="checkbox"
                                    name="allA"
                                    id="all"
                                    className="inputCheckbox"
                                    onChange={(e) => handleCheckboxChange(e)}
                                />
                                <label
                                    htmlFor="all"
                                    className="checkbox-option-item_label"
                                >
                                    Tất cả
                                </label>
                            </div>
                            <div className="input-checkbox-content__group">
                                <input
                                    type="checkbox"
                                    name="xA"
                                    id="xA"
                                    className="inputCheckbox"
                                    checked={role.functionRole.xA}
                                    onChange={(e) => handleCheckboxChange(e)}
                                />
                                <label
                                    htmlFor="xA"
                                    className="checkbox-option-item_label"
                                >
                                    Chức năng x
                                </label>
                            </div>
                            <div className="input-checkbox-content__group">
                                <input
                                    type="checkbox"
                                    name="yA"
                                    id="yA"
                                    className="inputCheckbox"
                                    checked={role.functionRole.yA}
                                    onChange={(e) => handleCheckboxChange(e)}
                                />
                                <label
                                    htmlFor="yA"
                                    className="checkbox-option-item_label"
                                >
                                    Chức năng y
                                </label>
                            </div>
                            <div className="input-checkbox-content__group">
                                <input
                                    type="checkbox"
                                    name="zA"
                                    id="zA"
                                    className="inputCheckbox"
                                    checked={role.functionRole.zA}
                                    onChange={(e) => handleCheckboxChange(e)}
                                />
                                <label
                                    htmlFor="zA"
                                    className="checkbox-option-item_label"
                                >
                                    Chức năng z
                                </label>
                            </div>
                        </div>
                        <div className="input-checkbox-content">
                            <div className="input-checkbox-content__heading">
                                Nhóm chức năng B
                            </div>
                            <div className="input-checkbox-content__group">
                                <input
                                    type="checkbox"
                                    name="allB"
                                    id="allB"
                                    className="inputCheckbox"
                                    onChange={(e) => handleCheckboxChange(e)}
                                />
                                <label
                                    htmlFor="allB"
                                    className="checkbox-option-item_label"
                                >
                                    Tất cả
                                </label>
                            </div>
                            <div className="input-checkbox-content__group">
                                <input
                                    type="checkbox"
                                    name="xB"
                                    id="xB"
                                    className="inputCheckbox"
                                    checked={role.functionRole.xB}
                                    onChange={(e) => handleCheckboxChange(e)}
                                />
                                <label
                                    htmlFor="xB"
                                    className="checkbox-option-item_label"
                                >
                                    Chức năng x
                                </label>
                            </div>
                            <div className="input-checkbox-content__group">
                                <input
                                    type="checkbox"
                                    name="yB"
                                    id="yB"
                                    className="inputCheckbox"
                                    checked={role.functionRole.yB}
                                    onChange={(e) => handleCheckboxChange(e)}
                                />
                                <label
                                    htmlFor="yB"
                                    className="checkbox-option-item_label"
                                >
                                    Chức năng y
                                </label>
                            </div>
                            <div className="input-checkbox-content__group">
                                <input
                                    type="checkbox"
                                    name="zB"
                                    id="zB"
                                    className="inputCheckbox"
                                    checked={role.functionRole.zB}
                                    onChange={(e) => handleCheckboxChange(e)}
                                />
                                <label
                                    htmlFor="zB"
                                    className="checkbox-option-item_label"
                                >
                                    Chức năng z
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wrapper-addService__btn">
                <CustomButton
                    type="BtnOutline"
                    text="Hủy bỏ"
                    onClick={() => {
                        window.history.back();
                    }}
                />
                <CustomButton type="BtnDefault" text="Thêm" onClick={()=>handleAddRole(typeNoti)} />
            </div>
        </div>
    );
}

export default AddRolePage;
