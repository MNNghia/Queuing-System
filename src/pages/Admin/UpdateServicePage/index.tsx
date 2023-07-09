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
import { addService, fetchService, updateService } from "../../../redux/reducers/service";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
const { TextArea } = Input;

interface Service {
    nameService: string,
    // stateAction?: boolean,
    serviceDescription: string,
    idService: string
}

type NotificationType = "success" | "info" | "warning" | "error";

function UpdateServicePage() {
    const [service, setService] = useState({} as Service)
    const [diary, setDiary] = useCookies<any>(["Diary"]);


    const [api, contextHolder] = notification.useNotification();

    const dispatch = useDispatch<AppDispatch>();

    const { data, loading, error } = useSelector(
        (state: RootState) => state.service
    );

    ////get data
    useEffect(() => {
        dispatch(fetchService());
    }, [dispatch]);


    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get("ServiceId");

    useEffect(() => {
            const index = data.findIndex((value) => value.id === serviceId);
            if (data[index] && data[index].id) {
                setService(data[index])
            }
    }, [dispatch, data, serviceId])


    var typeNoti: NotificationType;

    if (
        service.nameService === undefined ||
        service.serviceDescription === undefined ||
        service.nameService === "" ||
        service.serviceDescription === ""
    ) {
        typeNoti = "warning";
    } else {
        typeNoti = "success";
    }

    ///add data
    const handleUpdate = (type: NotificationType) => {
        if (typeNoti === "success") {
            dispatch(updateService(service))
            const updateHandle = diary.Diary.handle + ",Cập nhật thông thông tin dịch vụ"
            setDiary("Diary", {...diary.Diary, handle: updateHandle})
        }
        openNotification(type);
    };

    //breadcrum User page
    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Dịch vụ", url: "" },
            { label: "Danh sách dịch vụ", url: "/service" },
            { label: "Chi tiết", url: "/service/serviceDetail" },
            { label: "Cập nhật", url: "/service/listService/updateService"},

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
                                value={service.idService}
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
                                            idService: service.idService
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
                                        checked
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
                                        <Input value="999" />
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
                    <CustomButton type="BtnDefault" text="Cập nhật" onClick={() => handleUpdate(typeNoti)} />
                </div>
            </div>
    );
}

export default UpdateServicePage;
