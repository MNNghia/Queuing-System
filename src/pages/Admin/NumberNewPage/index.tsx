import "./NumberNew.scss";
import DashboardLayout from "../../../layouts/Admin";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import DropDown from "../../../components/DropDown";
import { Modal } from "antd";
import CustomButton from "../../../components/button";
import images from "../../../assests/images";

function NumberNewPage() {
    const dispatch = useDispatch<AppDispatch>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Cấp số", url: "" },
            { label: "Danh sách cấp số", url: "/number" },
            { label: "Cấp số mới", url: "/number/numberNew" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);

    return (
            <div className="wrapper-numberNew">
                <div className="title">Quản lý cấp số</div>
                <div className="wrapper-number__content">
                    <div className="number-content">
                        <div className="number-content__heading">
                            Cấp số mới
                        </div>
                        <div className="number-content__option">
                            Dịch vụ khác hàng lựa chọn
                        </div>
                        <div className="number-content__dropdown">
                            <DropDown type="stateActive" label="" />
                        </div>

                        <div
                            className="wrapper-managerDevice__btn"
                            style={{ marginTop: "50px" }}
                        >
                            <CustomButton
                                type="BtnOutline"
                                text="Hủy bỏ"
                                onClick={() => {
                                    window.history.back();
                                }}
                            />
                            <CustomButton
                                type="BtnDefault"
                                text="In số"
                                onClick={() => setIsModalOpen(true)}
                            />
                        </div>
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && 
                    <div className="modal">
                    <div className="overlay" onClick={() => setIsModalOpen(false)}>
                        <div className="content">
                            <img src={images.cancel.default} alt="" className="icon-cancel" onClick={() => setIsModalOpen(false)} />
                            
                            <div className="content-description" >
                                <div className="heading">
                                    Số thứ tự được cấp
                                </div>
                                <div className="number">2001202</div>
                                <div className="positon">
                                    DV: Khám răng hàm mặt <span>(tại quầy số 1)</span> 
                                </div>
                            </div>
                            <div className="content-time">
                                <div className="time-grant">Thời gian cấp: 09:30 11/10/2021</div>
                                <div className="time-expiry">Hạn sử dụng: 17:30 11/10/2021</div>
                            </div>
                        </div>
                    </div>
                </div>
                }
                
            </div>
    );
}

export default NumberNewPage;
