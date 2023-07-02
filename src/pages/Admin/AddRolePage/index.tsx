import "./AddRole.scss";
import DashboardLayout from "../../../layouts/Admin";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import CustomInput from "../../../components/input/CustomInput";
import CustomButton from "../../../components/button";
import { Input } from "antd";
const { TextArea } = Input;

function AddRolePage() {
    const dispatch = useDispatch<AppDispatch>();

    //breadcrum AddRole page
    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Cài đặt hệ thống", url: "" },
            { label: "Quản lý vai trò", url: "/settingSystem/roleManage" },
            { label: "Thêm vai trò", url: "/settingSystem/roleManage/addRole" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);
    
    return (
            <div className="wrapper-addRole">
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
                                />
                            </div>
                            <div className="input-text__item">
                                <label htmlFor="" className="textarea-label">
                                    Mô tả:
                                </label>
                                <TextArea
                                    rows={7}
                                    placeholder="Nhập mô tả:"
                                    maxLength={10}
                                    className="input-textArea"
                                />

                                <p className="addRole-content__node">
                                    <span className="require">*</span>
                                    Là trường thông tin bắt buộc
                                </p>
                            </div>
                        </div>

                        <div className="content-description__input-checkbox">
                            <div className="heading">Phân quyền chức năng <span className="require">*</span></div>
                            <div className="input-checkbox-content">
                                <div className="input-checkbox-content__heading">Nhóm chức năng A</div>
                                <div className="input-checkbox-content__group">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id="all"
                                        className="inputCheckbox"
                                    />
                                    <label htmlFor="all" className="checkbox-option-item_label">
                                        Tất cả
                                    </label>
                                </div>
                                <div className="input-checkbox-content__group">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id="all"
                                        className="inputCheckbox"
                                    />
                                    <label htmlFor="all" className="checkbox-option-item_label">
                                        Tất cả
                                    </label>
                                </div>
                            </div>
                            <div className="input-checkbox-content">
                                <div className="input-checkbox-content__heading">Nhóm chức năng A</div>
                                <div className="input-checkbox-content__group">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id="all"
                                        className="inputCheckbox"
                                    />
                                    <label htmlFor="all" className="checkbox-option-item_label">
                                        Tất cả
                                    </label>
                                </div>
                                <div className="input-checkbox-content__group">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id="all"
                                        className="inputCheckbox"
                                    />
                                    <label htmlFor="all" className="checkbox-option-item_label">
                                        Tất cả
                                    </label>
                                </div>
                                <div className="input-checkbox-content__group">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id="all"
                                        className="inputCheckbox"
                                    />
                                    <label htmlFor="all" className="checkbox-option-item_label">
                                        Tất cả
                                    </label>
                                </div>
                                <div className="input-checkbox-content__group">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id="all"
                                        className="inputCheckbox"
                                    />
                                    <label htmlFor="all" className="checkbox-option-item_label">
                                        Tất cả
                                    </label>
                                </div>
                                <div className="input-checkbox-content__group">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id="all"
                                        className="inputCheckbox"
                                    />
                                    <label htmlFor="all" className="checkbox-option-item_label">
                                        Tất cả
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
                    <CustomButton type="BtnDefault" text="Thêm" />
                </div>
            </div>
    );
}

export default AddRolePage;
