import "./AddServicePage.scss";
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
import { addService, fetchService } from "../../../redux/reducers/service";
import { useSelector } from "react-redux";
const { TextArea } = Input;

interface Service {
    nameService: string,
    stateAction?: string,
    serviceDescription: string,
    idService: string,
}

type NotificationType = "success" | "info" | "warning" | "error";

function AddServicePage() {
    const [service, setService] = useState({stateAction: 'Ngưng hoạt động'} as Service)

    const [api, contextHolder] = notification.useNotification();


    const dispatch = useDispatch<AppDispatch>();

    const { data, loading, error } = useSelector(
        (state: RootState) => state.service
    );

    ////get data
    useEffect(() => {
        dispatch(fetchService());
    }, [dispatch]);

    //data.lenght
    var lengthData: any = data.length
    var idSer: any
    if(lengthData < 10){
        idSer = "00" + lengthData
    }
    if(lengthData >=10 && lengthData < 100){
        idSer = '0' + lengthData
    }

    var typeNoti: NotificationType;

    if (
        service.nameService === undefined ||
        service.serviceDescription === undefined ||
        service.nameService === "" ||
        service.serviceDescription === ""
    ) {
        typeNoti = "warning";
    } else if (data.find((value) => value.idService === service.idService)) {
        typeNoti = "info";
    } else {
        typeNoti = "success";
    }

    ///add data
    const handleAddService = (type: NotificationType) => {
        if (typeNoti === "success") {

            dispatch(addService(service));
            setService({idService: lengthData + 1} as Service)
        }
        openNotification(type);
    };

    //breadcrum User page
    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Thiết bị", url: "" },
            { label: "Danh sách dịch vụ", url: "/service" },
            { label: "Thêm thiết bị", url: "/service/addService" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);

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
                message: 'Thêm thiết bị thành công',
            })
        }
        if (type === "info") {
            api.info({
                key,
                message: "Mã thiết bị đã tồn tại",
            });
        }
    };

    return (
            <div className="wrapper-addServive">
                {contextHolder}
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
                                value={idSer}
                            />
                            <CustomInput
                                type="text"
                                label="Tên dịch vụ"
                                request
                                placeholder="Tên dịch vụ"
                                onChange={(e) => {
                                        setService({
                                            ...service,
                                            nameService: e.target.value,
                                            idService: idSer
                                        });
                                    }}
                                    value={service.nameService}
                            />
                        </div>
                        <div className="input-item">
                            <label htmlFor="" className="textarea-label">
                                Mô tả dịch vụ
                            </label>
                            <TextArea
                                rows={5}
                                placeholder="Mô tả dịch vụ"
                                
                                className="input-textArea"
                                onChange={(e)=> {
                                    setService({
                                        ...service,
                                        serviceDescription: e.target.value
                                    })
                                }}
                                value={service.serviceDescription}
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
                                        checked = {true}
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
                                        <Input value="000" />
                                        <span className="checkbox-option-item_label">
                                            đến
                                        </span>
                                        <Input  value="999"/>
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
                                        id="all"
                                        className="inputCheckbox"
                                    />
                                    <label htmlFor="all" className="checkbox-option-item_label">
                                        Tất cả
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
                    <CustomButton type="BtnDefault" text="Cập nhật" onClick={() => handleAddService(typeNoti)} />
                </div>
            </div>
    );
}

export default AddServicePage;
