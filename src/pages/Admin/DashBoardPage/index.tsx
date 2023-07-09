import "./DashBoard.scss";
import { useDispatch } from "react-redux";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../redux/store";
import images from "../../../assests/images";
import DoughnutChart from "../../../components/Chart/Doughnut";
import LineChart from "../../../components/Chart/LineChart";
import DropDown from "../../../components/DropDown";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useSelector } from "react-redux";
import { fetchDevice } from "../../../redux/reducers/device";
import { fetchNumber } from "../../../redux/reducers/number";
import { fetchService } from "../../../redux/reducers/service";




function DashBoardPage() {
    const dispatch = useDispatch<AppDispatch>();

    const [value, onChange] = useState<any>(new Date())

    const { data: dataDevice} = useSelector(
        (state: RootState) => state.device
    );

    const { data: dataService} = useSelector(
        (state: RootState) => state.service
    );

    const { data: dataNumber} = useSelector(
        (state: RootState) => state.number
    );

    ////get data
    useEffect(() => {
        dispatch(fetchDevice());
    }, [dispatch]);

    ////get data
    useEffect(() => {
        dispatch(fetchNumber());
    }, [dispatch]);

    ////get data
    useEffect(() => {
        dispatch(fetchService())
    }, [dispatch])

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
                                {dataNumber.length}
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
                                {dataNumber.filter((value) => value.state === "Đã sử dụng").length}
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
                            Số thứ tự đang chờ
                        </div>
                        <div className="dashboard-content-item__index">
                            <span className="dashboard-content-item__index-total">
                                {dataNumber.filter((value) => value.state === "Đang chờ").length}
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
                                {dataNumber.filter((value) => value.state === "Bỏ qua").length}
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
                            <div className="total-device__number">{dataDevice.length}</div>
                            <div className="total-device__type-device">
                                <img src={images.monitor.default} alt="" />
                                Thiết bị 
                            </div>
                        </div>

                        <div className="device-state">
                            <div className="device-state__active">
                                <img src={images.stateActive.default} alt="" />
                                <div style={{width: '120px'}}>Đang hoạt động</div>
                                
                                <span style={{color: '#FF7506'}}>{dataDevice.filter((value) => value.stateAction === true).length}</span>
                            </div>
                            <div className="device-state__stop">
                                <img src={images.stateStop.default} alt="" />
                                <div style={{width: '120px'}}>Ngừng hoạt động</div>
                                
                                <span style={{color: '#FF7506'}}>{dataDevice.filter((value) => value.stateAction === false).length}</span>
                            </div>
                        </div>
                    </div>

                    <div className="overview-percent__item">
                        <div className="percent-item">
                            <DoughnutChart a={dataService.filter((value) => value.stateAction === "Đang hoạt động").length} b={dataService.filter((value) => value.stateAction === "Ngưng hoạt động").length}/>
                        </div>

                        <div className="total-device">
                            <div className="total-device__number">{dataService.length}</div>
                            <div className="total-device__type-device" style={{color: '#4277FF'}}>
                                <img src={images.overService.default} alt="" />
                                Dịch vụ
                            </div>
                        </div>

                        <div className="device-state">
                            <div className="device-state__active">
                                <img src={images.stateServiceActive.default} alt="" />
                                <div style={{width: '120px'}}>Đang hoạt động</div>
                                
                                <span style={{color: '#4277FF'}}>{dataService.filter((value) => value.stateAction === "Đang hoạt động").length}</span>
                            </div>
                            <div className="device-state__stop">
                                <img src={images.stateStop.default} alt="" />
                                <div style={{width: '120px'}}>Ngừng hoạt động</div>
                                
                                <span style={{color: '#4277FF'}}>{dataService.filter((value) => value.stateAction === "Ngưng hoạt động").length}</span>
                            </div>
                        </div>
                    </div>

                    <div className="overview-percent__item">
                        <div className="percent-item">
                            <DoughnutChart a={dataNumber.filter((value) => value.state === "Đang chờ").length} b={dataNumber.filter((value) => value.state === "Đã sử dụng").length} c ={dataNumber.filter((value) => value.state === "Bỏ qua").length}/>
                        </div>

                        <div className="total-device">
                            <div className="total-device__number">{dataNumber.length}</div>
                            <div className="total-device__type-device" style={{color: '#35C75A'}}>
                                <img src={images.overNumber.default} alt="" />
                                Cấp số
                            </div>
                        </div>

                        <div className="device-state">
                            <div className="device-state__active">
                                <img src={images.stateNumberActive.default} alt="" />
                                <div style={{width: '120px'}}>Đang chờ</div>
                                
                                <span style={{color: '#35C75A'}}>{dataNumber.filter((value) => value.state === "Đang chờ").length}</span>
                            </div>
                            <div className="device-state__stop" style={{marginBottom: '7px'}}>
                                <img src={images.stateStop.default} alt="" />
                                <div style={{width: '120px'}}>Đã sử dụng</div>
                                
                                <span style={{color: '#35C75A'}}>{dataNumber.filter((value) => value.state === "Đã sử dụng").length}</span>
                            </div>
                            <div className="device-state__stop">
                                <img src={images.stateSkipActive.default} alt="" />
                                <div style={{width: '120px'}}>Bỏ qua</div>
                                
                                <span style={{color: '#35C75A'}}>{dataNumber.filter((value) => value.state === "Bỏ qua").length}</span>
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
