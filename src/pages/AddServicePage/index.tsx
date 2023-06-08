import "./AddServicePage.scss";
import DashboardLayout from "../../layouts/Dashboard/DashboardLayout";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import CustomInput from "../../components/input/CustomInput";
import CustomButton from "../../components/button";
import { Input } from "antd";
const { TextArea } = Input;

function AddServicePage() {
    const dispatch = useDispatch<AppDispatch>();

    //breadcrum User page
    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Thiết bị", url: "" },
            { label: "Danh sách dịch vụ", url: "/service" },
            { label: "Thêm thiết bị", url: "/service/addService" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);

    return (
        <DashboardLayout>
            <div className="wrapper-addServive">
                <div className="title">Quản lý dịch vụ</div>
                <div className="wrapper-addService-content">
                    <div className="title" style={{ fontSize: "20px" }}>
                        Thông tin dịch vụ
                    </div>
                    <div className="addService-content__input">
                        <div className="input-item">
                            <CustomInput
                                type="text"
                                label="Mã dịch vụ"
                                request
                            />
                            <CustomInput
                                type="text"
                                label="Tên dịch vụ"
                                request
                                placeholder="Tên dịch vụ"
                            />
                        </div>
                        <div className="input-item">
                            <label htmlFor="" className="textarea-label">
                                Mô tả dịch vụ
                            </label>
                            <TextArea
                                rows={5}
                                placeholder="Mô tả dịch vụ"
                                maxLength={10}
                                className="input-textArea"
                            />
                        </div>
                    </div>
                    <div className="addService-content__checkbox">
                        <div className="title" style={{ fontSize: "20px" }}>
                            Quy tắc cấp số
                        </div>
                        <table className="checkbox-option">
                            <tr className="checkbox-option-item">
                                <td>
                                    <input
                                        type="checkbox"
                                        name=""
                                        id="a"
                                        className="inputCheckbox"
                                    />
                                    <label
                                        className="checkbox-option-item_label"
                                        htmlFor="a"
                                    >
                                        Tăng tự động từ
                                    </label>
                                </td>
                                <td>
                                    <div className="checkbox-option-item__input">
                                        <Input />
                                        <span className="checkbox-option-item_label">
                                            đến
                                        </span>
                                        <Input />
                                    </div>
                                </td>
                            </tr>

                            <tr className="checkbox-option-item">
                                <td>
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        className="inputCheckbox"
                                    />
                                    <label className="checkbox-option-item_label">
                                        Prefix
                                    </label>
                                </td>

                                <td>
                                    <Input />
                                </td>
                            </tr>

                            <tr className="checkbox-option-item">
                                <td>
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        className="inputCheckbox"
                                    />
                                    <label className="checkbox-option-item_label">
                                        Surfix
                                    </label>
                                </td>
                                <td>
                                    <Input />
                                </td>
                            </tr>

                            <tr className="checkbox-option-item">
                                <td>
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        className="inputCheckbox"
                                    />
                                    <label className="checkbox-option-item_label">
                                        Reset mỗi ngày
                                    </label>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <p className="addService-content__node">
                        <span className="require">*</span>
                        Là trường thông tin bắt buộc
                    </p>
                </div>
                <div className="wrapper-addService__btn">
                    <CustomButton
                        type="BtnOutline"
                        text="Hủy bỏ"
                        onClick={() => {
                            window.history.back();
                        }}
                    />
                    <CustomButton type="BtnDefault" text="Cập nhật" />
                </div>
            </div>
        </DashboardLayout>
    );
}

export default AddServicePage;
