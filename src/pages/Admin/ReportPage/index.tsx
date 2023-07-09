import "./Report.scss";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { saveAs } from "file-saver";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import images from "../../../assests/images";
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
    const [dataPage, setDataPage] = useState<any>();

    const itemsPerPage = 9;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    //Pagination
    useEffect(() => {
        if (data) {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const slicedData = data.slice(startIndex, endIndex);
            if (slicedData) {
                slicedData.sort(function (a: any, b: any) {
                    return +a.STT - +b.STT;
                });
                setDataPage(slicedData);
            }
        }
    }, [currentPage, data]);

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
    const handleDownload = () => {
        // Tải file về
        saveAs("../../../assests/file/DAY-LA-FILE-MAU-PDF.pdf", "example.pdf");
    };

    return (
        <div className="wrapper-report">
            <div className="report-filter">
                <div className="content-filter__item data-time-item">
                    <p className="date-time__label">Chọn thời thời gian</p>
                    <div className="date-time">
                        <DatePicker
                            onChange={onChange}
                            className="data-time__item"
                            style={{ height: "46px" }}
                        />
                        <img
                            src={images.arrow_right.default}
                            alt=""
                            style={{ padding: "0 10px" }}
                        />
                        <DatePicker
                            onChange={onChange}
                            className="data-time__item"
                            style={{ height: "46px" }}
                        />
                    </div>
                </div>
                <div className="content-table">
                    <table className="wrapper-table">
                        <tbody>
                            <tr>
                                <th>Số thứ tự</th>
                                <th>Tên dịch vụ</th>
                                <th>Thời gian cấp</th>
                                <th>Tình trạng</th>
                                <th>Nguồn cấp</th>
                            </tr>
                            {dataPage &&
                                dataPage.map((value: any, index: any) => (
                                    <tr
                                        key={index}
                                        className={
                                            index % 2 !== 0 ? "even" : ""
                                        }
                                    >
                                        <td>{value.STT}</td>
                                        <td>{value.nameService}</td>
                                        <td>{value.time}</td>
                                        <td>
                                            <img
                                                src={
                                                    value.state === "Đang chờ"
                                                        ? images.waiting.default
                                                        : value.state ===
                                                          "Bỏ qua"
                                                        ? images.skip.default
                                                        : images.used.default
                                                }
                                                alt=""
                                            />
                                            {value.state}
                                        </td>
                                        <td>{value.source}</td>
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

                <div
                    onClick={handleDownload}
                    className="button-add"
                    style={{ top: "230px" }}
                >
                    <img src={images.download.default} alt="" />
                    <br />
                    Tải về
                </div>
            </div>
        </div>
    );
}

export default ReportPage;
