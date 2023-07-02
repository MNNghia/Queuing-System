import "./Number.scss";
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
import { fetchNumber } from "../../../redux/reducers/number";

function NumberPage() {
    const dispatch = useDispatch<AppDispatch>();

    const { data, loading, error } = useSelector(
        (state: RootState) => state.number
    );

    ////get data
    useEffect(() => {
        dispatch(fetchNumber());
    }, [dispatch]);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [searchResult, setSearchResult] = useState<any>();
    const [fill, setFill] = useState<any>({serviceName : "Tất cả", state: "Tất cả", source: "Tất cả" })
    const [fillresult, setFillresult] = useState<any>()
    const itemsPerPage = 10;
    const dataPage = [];

    console.log(fillresult)

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const handleSearch = () => {
            // Thuật toán tìm kiếm chuỗi con Brute-Force
            const text = searchText.toLowerCase();

            const result = data.filter((value) =>
                value.nameClient.toLowerCase().includes(text)
            );

            setSearchResult(result);
        };
        handleSearch();
    }, [searchText, data]);

    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Cấp số", url: "" },
            { label: "Danh sách cấp số", url: "/number" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);

    const onChange: DatePickerProps["onChange"] = (date, dateString) => {
        console.log(date, dateString);
    };

    useEffect(() => {
        if(fill.serviceName === "Tất cả" && fill.source === "Tất cả" && fill.state === "Tất cả"){
            setFillresult(data)
        } else {
            //logic
        }
    },[fill,data])

    return (
        <div className="wrapper-number">
            <div className="title">Quản lý cấp số</div>
            <div className="wrapper-number__content">
                <div className="content-filter">
                    <div className="content-filter__item drop-down">
                        <DropDown
                                type="serviceName"
                                label="Tên dịch vụ "
                                onClick ={(value: string) => setFill({...fill, serviceName: value})}
                            />
                    </div>

                    <div className="content-filter__item drop-down">
                        <DropDown
                                type="state"
                                label="Tình trạng"
                                onClick={(value: string) => setFill({...fill, state: value})}/>
                    </div>

                    <div className="content-filter__item drop-down">
                        <DropDown
                                type="source"
                                label="Nguồn cấp"
                                onClick = {(value: string) => setFill({...fill, source: value})}/>
                    </div>

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

                    <div className="content-filter__item">
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
                <div className="content-table">
                    <table className="wrapper-table">
                        <tr>
                            <th>STT</th>
                            <th>Tên khách hàng</th>
                            <th>Tên dịch vụ</th>
                            <th>Thời gian cấp</th>
                            <th>Hạn sử dụng</th>
                            <th>Trạng thái</th>
                            <th>Nguồn cấp</th>
                            <th></th>
                        </tr>
                        {data.map((value, index) => (
                            <tr key={index}>
                                <td>{value.STT}</td>
                                <td>{value.nameClient}</td>
                                <td>{value.nameService}</td>
                                <td>{value.time}</td>
                                <td>{value.expiry}</td>
                                <td>
                                    <img src={images.waiting.default} alt="" />
                                    Đang chờ
                                </td>
                                <td>{value.source}</td>
                                <td>
                                    <Link
                                        to={{
                                            pathname: "/number/numberDetail",
                                            search: `numberId=${value.id}`,
                                        }}
                                    >
                                        Chi tiết
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </table>

                    <CustomPagination
                        itemsPerPage={itemsPerPage}
                        totalItems={1} //data.length
                        onPageChange={handlePageChange}
                    />
                </div>

                <Link to="/number/numberNew" className="button-add">
                    <img src={images.add.default} alt="" />
                    <br />
                    Cáp số mới
                </Link>
            </div>
        </div>
    );
}

export default NumberPage;
