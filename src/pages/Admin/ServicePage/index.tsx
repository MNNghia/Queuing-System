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
import { DatePicker, Pagination } from "antd";
import CustomInput from "../../../components/input/CustomInput";
import images from "../../../assests/images";
import { Link } from "react-router-dom";
import CustomPagination from "../../../components/Pagination";
import { useSelector } from "react-redux";
import { fetchService } from "../../../redux/reducers/service";
import { set } from "date-fns";

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
    const [fillData, setFillData] = useState<any>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPage, setDataPage] = useState<any>();
    const itemsPerPage = 9;

    const handlePageChange = (page: number, papeSize?: number) => {
        setCurrentPage(page);
    };


    useEffect(() => {
        const handleSearch = () => {
            let result;
            if (fillData === "Hoạt động") {
                result = data.filter(
                    (value: any) => value.stateAction === "Hoạt động"
                );
                
            } else if (fillData === "Ngưng hoạt động") {
                result = data.filter(
                    (value: any) => value.stateAction === "Ngưng hoạt động"
                );
            } else {
                result = [...data]
            }
            // Thuật toán tìm kiếm chuỗi con Brute-Force
            const text = searchText.toLowerCase();
            
            if (text !== undefined || text !== "") {
                result = result.filter((value: any) =>
                    value.nameService.toLowerCase().includes(text)
                );
            }

            if (result) {
                result.sort(function (a: any, b: any) {
                    return +a.idService - +b.idService;
                });
            }

            setSearchResult(result)
        };
        handleSearch();
    }, [searchText, data, fillData]);


    //Pagination
    useEffect(() => {
        if (searchResult) {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const slicedData = searchResult.slice(startIndex, endIndex);
            setDataPage(slicedData);
        }
    }, [currentPage, data, searchResult]);

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
                    <div
                        className="service-content__filter-item"
                        style={{ width: "300px" }}
                    >
                        <DropDown
                            type="stateActive"
                            label="Trạng thái hoạt động"
                            onClick={(value: any) =>
                                setFillData(value )
                            }
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
                        <tbody>
                        <tr>
                            <th>Mã dịch vụ</th>
                            <th>Tên dịch vụ</th>
                            <th>Mô tả</th>
                            <th>Trạng thái hoạt động</th>

                            <th></th>
                            <th></th>
                        </tr>
                        {dataPage &&
                            dataPage.map((value: any, index: any) => (
                                <tr
                                    key={index}
                                    className={index % 2 !== 0 ? "even" : ""}
                                >
                                    <td>{value.idService}</td>
                                    <td>{value.nameService}</td>
                                    <td>{value.serviceDescription}</td>
                                    <td>
                                        <img
                                            src={images.stopAction.default}
                                            alt=""
                                        />
                                        {value.stateAction}
                                    </td>
                                    <td>
                                        <Link 

                                        to={{
                                                pathname:
                                                    "/service/serviceDetail",
                                                search: `serviceId=${value.id}`,
                                            }}
                                        >
                                            Chi tiết
                                        </Link>
                                    </td>
                                    <td>
                                        <Link
                                            to={{
                                                pathname:
                                                    "/service/listService/updateService",
                                                search: `ServiceId=${value.id}`,
                                            }}
                                        >
                                            Cập nhật
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <CustomPagination
                        itemsPerPage={itemsPerPage}
                        totalItems={data.length} //data.length
                        onPageChange={handlePageChange}
                    />
                </div>

                <Link to="/service/addService" className="button-add">
                    <img src={images.add.default} alt="" />
                    <br />
                    Thêm dịch vụ
                </Link>
            </div>
        </div>
    );
}

export default ServicePage;
