import "./DashBoard.scss";
import { useDispatch } from "react-redux";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect } from "react";
import { AppDispatch } from "../../redux/store";
import DashboardLayout from "../../layouts/Dashboard/DashboardLayout";
import images from "../../assests/images";
import DoughnutChart from "../../components/Doughnut";



function DashBoardPage() {

    
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Dashboard", url: "/dashboard" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);

    return (
        <DashboardLayout>
            <div className="wrapper-dashboard">
                <div className="dashboard-content">
                    <div className="title">Biểu đồ cấp số</div>
                    <div className="dashboard-content-items">
                        <div className="dashboard-content-item">
                            <div className="dashboard-content-item__heading">
                                <img src={images.calender.default} alt="" />
                                Số thứ tự đã cấp
                            </div>
                            <div className="dashboard-content-item__index">
                                <span className="dashboard-content-item__index-total">4.221</span>
                                <span className="dashboard-content-item__index-grow">
                                    <img src={images.grow.default} alt="" />
                                    32,41%
                                </span>
                            </div>
                        </div>

                        <div className="dashboard-content-item">
                            <div className="dashboard-content-item__heading">
                                <img src={images.calender.default} alt="" />
                                Số thứ tự đã cấp
                            </div>
                            <div className="dashboard-content-item__index">
                                <span className="dashboard-content-item__index-total">4.221</span>
                                <span className="dashboard-content-item__index-grow">
                                    <img src={images.grow.default} alt="" />
                                    32,41%
                                </span>
                            </div>
                        </div>

                        <div className="dashboard-content-item">
                            <div className="dashboard-content-item__heading">
                                <img src={images.calender.default} alt="" />
                                Số thứ tự đã cấp
                            </div>
                            <div className="dashboard-content-item__index">
                                <span className="dashboard-content-item__index-total">4.221</span>
                                <span className="dashboard-content-item__index-grow">
                                    <img src={images.grow.default} alt="" />
                                    32,41%
                                </span>
                            </div>
                        </div>

                        <div className="dashboard-content-item">
                            <div className="dashboard-content-item__heading">
                                <img src={images.calender.default} alt="" />
                                Số thứ tự đã cấp
                            </div>
                            <div className="dashboard-content-item__index">
                                <span className="dashboard-content-item__index-total">4.221</span>
                                <span className="dashboard-content-item__index-grow">
                                    <img src={images.grow.default} alt="" />
                                    32,41%
                                </span>
                            </div>
                        </div>

                    </div>
                </div>


                <div className="dashboard-overview">
                    <div className="title" style={{ marginLeft: "30px" }}>
                        Tổng quan
                    </div>
                    {/* Begin: Overview-index */}
                    <div className="overview-index">
                        <div className="overview-percent__item">
                            <div className="percent-item">
                                {/* <DoughnutChart /> */}
                            </div>

                            <div className="total-device">
                                <div className="total-device__number">
                                    4.221
                                </div>
                                <div className="total-device__type-device">
                                    <img src={images.monitor.default} alt="" />
                                    Thiết bị
                                </div>
                            </div>

                            <div className="device-state">
                                <div className="device-state__active">
                                    <img
                                        src={images.stateActive.default}
                                        alt=""
                                    />
                                    Đang hoạt động
                                    <span>3.799</span>
                                </div>
                                <div className="device-state__stop">
                                    <img
                                        src={images.stateStop.default}
                                        alt=""
                                    />
                                    Ngừng hoạt động
                                    <span>422</span>
                                </div>
                            </div>
                        </div>

                        <div className="overview-percent__item">
                            <div className="percent-item">a</div>

                            <div className="total-device">
                                <div className="total-device__number">
                                    4.221
                                </div>
                                <div className="total-device__type-device">
                                    <img src={images.monitor.default} alt="" />
                                    Thiết bị
                                </div>
                            </div>

                            <div className="device-state">
                                <div className="device-state__active">
                                    <img
                                        src={images.stateActive.default}
                                        alt=""
                                    />
                                    Đang hoạt động
                                    <span>3.799</span>
                                </div>
                                <div className="device-state__stop">
                                    <img
                                        src={images.stateStop.default}
                                        alt=""
                                    />
                                    Ngừng hoạt động
                                    <span>422</span>
                                </div>
                            </div>
                        </div>

                        <div className="overview-percent__item">
                            <div className="percent-item">a</div>

                            <div className="total-device">
                                <div className="total-device__number">
                                    4.221
                                </div>
                                <div className="total-device__type-device">
                                    <img src={images.monitor.default} alt="" />
                                    Thiết bị
                                </div>
                            </div>

                            <div className="device-state">
                                <div className="device-state__active">
                                    <img
                                        src={images.stateActive.default}
                                        alt=""
                                    />
                                    Đang hoạt động
                                    <span>3.799</span>
                                </div>
                                <div className="device-state__stop">
                                    <img
                                        src={images.stateStop.default}
                                        alt=""
                                    />
                                    Ngừng hoạt động
                                    <span>422</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End: Overview Index */}

                    <div className="dashboard-overview__calendar">

                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default DashBoardPage;
