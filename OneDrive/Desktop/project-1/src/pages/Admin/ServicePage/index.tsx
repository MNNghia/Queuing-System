import "./ServicePage.scss";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch } from "react-redux";
import DropDown from "../../../components/DropDown";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import CustomInput from "../../../components/input/CustomInput";
import images from "../../../assests/images";
import { Link } from "react-router-dom";
import CustomPagination from "../../../components/Pagination";
import { useSelector } from "react-redux";
import { fetchService } from "../../../redux/reducers/service";

function ServicePage() {
    const dispatch = useDispatch<AppDispatch>();

    const { data, loading, error } = useSelector(
        (state: RootState) => state.service
    );

    ////get data
    useEffect(() => {
        dispatch(fetchService());
    }, [dispatch]);

    const [searchText, setSearchText] = useState("");
    const [searchResult, setSearchResult] = useState<any>();
    const[fillData, setFillData] = useState<any>({})
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const dataPage = [];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if(fillData.key === 'Hoạt động'){
            // const result = data.filter((value) => value.state ==== true)
            // setFillData({...fillData, value : result})
        } else if(fillData.key === 'Ngưng hoạt động'){
            // const result = data.filter((value) => value.state ==== false)
            // setFillData({...fillData, value : result})
        } else {
            setFillData({...fillData, value : data}) 
        }
    }, [data, fillData])


    useEffect(() => {
        const handleSearch = () => {
            // Thuật toán tìm kiếm chuỗi con Brute-Force
            const text = searchText.toLowerCase();
            if(fillData.value){
                const result = fillData.value.filter((value: any) =>
                    value.nameService.toLowerCase().includes(text)
                    )
                    setSearchResult(result);
            }

        };
        handleSearch();
    }, [searchText, data, fillData]);

    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Dịch vụ", url: "" },
            { label: "Quản lý dịch vụ", url: "/service" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);

    const onChange: DatePickerProps["onChange"] = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <div className="wrapper-service">
            <div className="title">Quản lý dịch vụ</div>
            <div className="wrapper-service-content">
                <div className="service-content__filter-items">
                    <div className="service-content__filter-item" style={{width: '300px'}}>
                        <DropDown
                            type="stateActive"
                            label="Trạng thái hoạt động"
                            onClick={(value: any) => setFillData({...fillData, key : value})}
                        />
                    </div>

                    <div className="service-content__filter-item data-time-item">
                        <p>Chọn thời thời gian</p>
                        <div className="date-time">
                            <DatePicker
                                onChange={onChange}
                                className="data-time__item"
                            />
                            <img
                                src={images.arrow_right.default}
                                alt=""
                                style={{ padding: "0 10px" }}
                            />
                            <DatePicker
                                onChange={onChange}
                                className="data-time__item"
                            />
                        </div>
                    </div>
                    <div className="service-content__filter-item">
                        <CustomInput
                            type="search"
                            label="Từ khóa"
                            placeholder="nhập từ khóa"
                            onChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="service-content__table">
                    <table className="wrapper-table">
                        <tr>
                            <th>Mã dịch vụ</th>
                            <th>Tên dịch vụ</th>
                            <th>Mô tả</th>
                            <th>Trạng thái hoạt động</th>

                            <th></th>
                            <th></th>
                        </tr>
                        {fillData.value && (searchResult ? searchResult : fillData.value).map((value: any, index: any) => (
                            <tr key={index} className={index % 2 !== 0 ? "even": ""}>
                                <td>{value.idService}</td>
                                <td>{value.nameService}</td>
                                <td>{value.serviceDescription}</td>
                                <td>
                                    <img
                                        src={images.stopAction.default}
                                        alt=""
                                    />
                                    Ngưng hoạt động
                                </td>
                                <td>
                                    <Link to="/service/serviceDetail">
                                        Chi tiết
                                    </Link>
                                </td>
                                <td>
                                    <Link to={{
                                                pathname:
                                                    "/service/listService/updateService",
                                                search: `ServiceId=${value.id}`,
                                            }}>Cập nhật</Link>
                                </td>
                            </tr>
                        ))}
                        {/* <tr>
                            <td>KIO.01</td>
                            <td>Kiosk</td>
                            <td>192.168.1.10</td>
                            <td>
                                <img src={images.stopAction.default} alt="" />
                                Ngưng hoạt động
                            </td>
                            <td>
                                <Link to="/service/serviceDetail">
                                    Chi tiết
                                </Link>
                            </td>
                            <td>
                                <Link to="">Cập nhật</Link>
                            </td>
                        </tr> */}
                        {/* <tr className="even">
                                <td>KIO.01</td>
                                <td>Kiosk</td>
                                <td>192.168.1.10</td>
                                <td>
                                    <img src={images.action.default} alt="" />
                                    Hoạt động
                                </td>
                                <td>
                                    <Link to="/service/serviceDetail">Chi tiết</Link>
                                </td>
                                <td>
                                    <Link to="">Cập nhật</Link>
                                </td>
                            </tr> */}
                    </table>

                    <CustomPagination
                        itemsPerPage={itemsPerPage}
                        totalItems={1} //data.length
                        onPageChange={handlePageChange}
                    />
                </div>

                <Link to="/service/addService" className="button-add">
                    <img src={images.add.default} alt="" />
                    <br />
                    Thêm thiết bị
                </Link>
            </div>
        </div>
    );
}

export default ServicePage;
