import "./Report.scss";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch } from "react-redux";
import DropDown from "../../../components/DropDown";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import images from "../../../assests/images";
import { Link } from "react-router-dom";
import CustomPagination from "../../../components/Pagination";
import { useSelector } from "react-redux";
import { fetchNumber } from "../../../redux/reducers/number";

function ReportPage() {
    const dispatch = useDispatch<AppDispatch>();

    const { data, loading, error } = useSelector(
        (state: RootState) => state.number
    );

    ////get data
    useEffect(() => {
        dispatch(fetchNumber());
    }, [dispatch]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const dataPage = [];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Báo cáo", url: "" },
            { label: "Lập báo cáo", url: "/report" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);

    const onChange: DatePickerProps["onChange"] = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <div className="wrapper-report">
            <div className="report-filter">
                <div className="content-filter__item data-time-item">
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
                <div className="content-table">
                    <table className="wrapper-table">
                        <tr>
                            <th>Số thứ tự</th>
                            <th>Tên dịch vụ</th>
                            <th>Thời gian cấp</th>
                            <th>Tình trạng</th>
                            <th>Nguồn cấp</th>
                        </tr>
                        {data.map((value, index) => (
                            <tr key={index} className={index % 2 !== 0 ? 'even' : ''}>
                                <td>{value.STT}</td>
                                <td>{value.nameService}</td>
                                <td>{value.time}</td>
                                <td>
                                    <img src={value.state === "Đang chờ"? images.waiting.default: value.state === "Bỏ qua" ? images.skip.default : images.used.default} alt="" />
                                    {value.state}
                                </td>
                                <td>{value.source}</td>
                            </tr>
                        ))}
                    </table>

                    <CustomPagination
                        itemsPerPage={itemsPerPage}
                        totalItems={1} //data.length
                        onPageChange={handlePageChange}
                    />
                </div>

                <Link to="" className="button-add" style={{top: "230px"}}>
                    <img src={images.download.default} alt="" />
                    <br />
                    Tải về
                </Link>
            </div>
        </div>
    );
}

export default ReportPage;
