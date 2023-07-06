import "./DashBoard.scss";
import { useDispatch } from "react-redux";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../../redux/store";
import images from "../../../assests/images";
import DoughnutChart from "../../../components/Chart/Doughnut";
import LineChart from "../../../components/Chart/LineChart";
import DropDown from "../../../components/DropDown";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


function DashBoardPage() {
    const dispatch = useDispatch<AppDispatch>();

    const [value, onChange] = useState<any>(new Date());

    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Dashboard", url: "/dashboard" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);

    return (
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
                            <span className="dashboard-content-item__index-total">
                                4.221
                            </span>
                            <span className="dashboard-content-item__index-grow">
                                <img src={images.grow.default} alt="" />
                                32,41%
                            </span>
                        </div>
                    </div>

                    <div className="dashboard-content-item">
                        <div className="dashboard-content-item__heading">
                            <img src={images.STT.default} alt="" />
                            Số thứ tự đã sử dụng
                        </div>
                        <div className="dashboard-content-item__index">
                            <span className="dashboard-content-item__index-total">
                                4.221
                            </span>
                            <span className="dashboard-content-item__index-grow">
                                <img src={images.down.default} alt="" />
                                32,41%
                            </span>
                        </div>
                    </div>

                    <div className="dashboard-content-item">
                        <div className="dashboard-content-item__heading">
                            <img src={images.userCall.default} alt="" />
                            Số thứ tự đã cấp
                        </div>
                        <div className="dashboard-content-item__index">
                            <span className="dashboard-content-item__index-total">
                                4.221
                            </span>
                            <span className="dashboard-content-item__index-grow">
                                <img src={images.grow.default} alt="" />
                                32,41%
                            </span>
                        </div>
                    </div>

                    <div className="dashboard-content-item">
                        <div className="dashboard-content-item__heading">
                            <img src={images.numberSkip.default} alt="" />
                            Số thứ tự đã bỏ qua
                        </div>
                        <div className="dashboard-content-item__index">
                            <span className="dashboard-content-item__index-total">
                                4.221
                            </span>
                            <span className="dashboard-content-item__index-grow">
                                <img src={images.grow.default} alt="" />
                                32,41%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="dashboard-content__line-chart" >
                    <div className="line-chart-info">
                        <div className="line-chart-info__wrapper">
                            <div className="line-chart__heading">Bảng thống kê theo ngày</div>
                            <div className="line-chart__time">Tháng 11/2023</div>
                        </div>
                        <div className="line-chart-info__dropdown">
                            <p>Xem theo</p>
                            <div className="" style={{width: '120px'}}>
                            <DropDown type='date' label="" onClick ={(e) => console.log(e)}/>
                            </div>
                        </div>
                    </div>
                    <LineChart/>
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
                            <DoughnutChart a={10} b={20}/>
                        </div>

                        <div className="total-device">
                            <div className="total-device__number">4.221</div>
                            <div className="total-device__type-device">
                                <img src={images.monitor.default} alt="" />
                                Thiết bị 
                            </div>
                        </div>

                        <div className="device-state">
                            <div className="device-state__active">
                                <img src={images.stateActive.default} alt="" />
                                <div style={{width: '120px'}}>Đang hoạt động</div>
                                
                                <span style={{color: '#FF7506'}}>3.799</span>
                            </div>
                            <div className="device-state__stop">
                                <img src={images.stateStop.default} alt="" />
                                <div style={{width: '120px'}}>Ngừng hoạt động</div>
                                
                                <span style={{color: '#FF7506'}}>422</span>
                            </div>
                        </div>
                    </div>

                    <div className="overview-percent__item">
                        <div className="percent-item">
                            <DoughnutChart a={10} b={20}/>
                        </div>

                        <div className="total-device">
                            <div className="total-device__number">4.221</div>
                            <div className="total-device__type-device" style={{color: '#4277FF'}}>
                                <img src={images.overService.default} alt="" />
                                Dịch vụ
                            </div>
                        </div>

                        <div className="device-state">
                            <div className="device-state__active">
                                <img src={images.stateServiceActive.default} alt="" />
                                <div style={{width: '120px'}}>Đang hoạt động</div>
                                
                                <span style={{color: '#4277FF'}}>3.799</span>
                            </div>
                            <div className="device-state__stop">
                                <img src={images.stateStop.default} alt="" />
                                <div style={{width: '120px'}}>Ngừng hoạt động</div>
                                
                                <span style={{color: '#4277FF'}}>422</span>
                            </div>
                        </div>
                    </div>

                    <div className="overview-percent__item">
                        <div className="percent-item">
                            <DoughnutChart a={10} b={20}/>
                        </div>

                        <div className="total-device">
                            <div className="total-device__number">4.221</div>
                            <div className="total-device__type-device" style={{color: '#35C75A'}}>
                                <img src={images.overNumber.default} alt="" />
                                Cấp số
                            </div>
                        </div>

                        <div className="device-state">
                            <div className="device-state__active">
                                <img src={images.stateNumberActive.default} alt="" />
                                <div style={{width: '120px'}}>Đang chờ</div>
                                
                                <span style={{color: '#35C75A'}}>3.799</span>
                            </div>
                            <div className="device-state__stop" style={{marginBottom: '7px'}}>
                                <img src={images.stateStop.default} alt="" />
                                <div style={{width: '120px'}}>Đã sử dụng</div>
                                
                                <span style={{color: '#35C75A'}}>422</span>
                            </div>
                            <div className="device-state__stop">
                                <img src={images.stateSkipActive.default} alt="" />
                                <div style={{width: '120px'}}>Bỏ qua</div>
                                
                                <span style={{color: '#35C75A'}}>422</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End: Overview Index */}

                <div className="dashboard-overview__calendar">
                    <Calendar onChange={onChange} value={value} />
                </div>
            </div>
        </div>
    );
}

export default DashBoardPage;
