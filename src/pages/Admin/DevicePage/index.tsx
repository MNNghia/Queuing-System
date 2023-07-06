import "./DevicePage.scss";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import CustomInput from "../../../components/input/CustomInput";
import { Link } from "react-router-dom";
import TruncateMarkup from "react-truncate-markup";
import images from "../../../assests/images";
import CustomPagination from "../../../components/Pagination";
import { useSelector } from "react-redux";
import { fetchDevice } from "../../../redux/reducers/device";

function DevicePage() {
    const dispatch = useDispatch<AppDispatch>();

    const { data, loading, error } = useSelector(
        (state: RootState) => state.device
    );

    ////get data
    useEffect(() => {
        dispatch(fetchDevice());
    }, [dispatch]);

    const [isTruncated, setIsTruncated] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [searchResult, setSearchResult] = useState<any>();
    const [dataPage, setDataPage] = useState<any>()
    const itemsPerPage = 9;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const handleSearch = () => {
            // Thuật toán tìm kiếm chuỗi con Brute-Force
            const text = searchText.toLowerCase();

            const result = data.filter((value) =>
                value.nameDevice.toLowerCase().includes(text)
            );

            setSearchResult(result);
        };
        handleSearch();
    }, [searchText, data]);

    //funtion render data in table

    //Pagination
    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const slicedData = (searchResult ? searchResult : data).slice(
            startIndex,
            endIndex)
            setDataPage(slicedData)
            
    },[currentPage, data, searchResult])

    const toggleTruncate = () => {
        setIsTruncated(!isTruncated);
    };
    //breadcrum User page
    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Thiết bị", url: "" },
            { label: "Danh sách thiết bị", url: "/device/listDevice" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);

    return (
        <div className="wrapper-listDevice">
            <div className="title">Danh sách thiết bị</div>
            <div className="wrapper-listDevice-content">
                <div className="wrapper-listDevice__filter">
                    <div className="wrapper-listDevice__filter-state">
                        {/* <DropDown type="stateActive" label="Trạng thái hoạt động" /> */}
                    </div>
                    <div className="wrapper-listDevice__filter-state">
                        {/* <DropDown type="stateConnect" label="Trạng thái kết nối" /> */}
                    </div>
                    <div className="filter-search">
                        <CustomInput
                            type="search"
                            label="Từ khóa"
                            placeholder="Nhập từ khóa"
                            onChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="wrapper-listDevice-content__table">
                    <table className="wrapper-table">
                        <tr>
                            <th>Mã thiết bị</th>
                            <th>Tên thiết bị</th>
                            <th>Địa chỉ IP</th>
                            <th>Trạng thái hoạt động</th>
                            <th>Trạng thái kết nối</th>
                            <th className="description">Dịch vụ sử dụng</th>
                            <th></th>
                            <th></th>
                        </tr>
                        { dataPage && dataPage.map(
                            (value: any, index: any) => (
                                <tr
                                    key={index}
                                    className={index % 2 === 0 ? "" : "even"}
                                >
                                    <td>{value.idDevice}</td>
                                    <td>{value.nameDevice}</td>
                                    <td>{value.ipAddress}</td>
                                    <td>
                                        <img
                                            src={images.stopAction.default}
                                            alt=""
                                        />
                                        Ngưng hoạt động
                                    </td>
                                    <td>
                                        <img
                                            src={images.stopAction.default}
                                            alt=""
                                        />
                                        Mất kết nối
                                    </td>
                                    <td
                                        onClick={toggleTruncate}
                                        className="viewMore-description"
                                    >
                                        {isTruncated ? (
                                            <TruncateMarkup
                                                lines={1}
                                                ellipsis="..."
                                            >
                                                <p>{value.service}</p>
                                            </TruncateMarkup>
                                        ) : (
                                            <p>{value.service}</p>
                                        )}
                                        {value.service.length > 10 &&
                                            isTruncated && (
                                                <div
                                                    className="viewMore"
                                                    onClick={toggleTruncate}
                                                >
                                                    Xem thêm
                                                </div>
                                            )}
                                    </td>
                                    <td>
                                        <Link
                                            to={{
                                                pathname:
                                                    "/device/listDevice/detailDevice",
                                                search: `deviceId=${value.id}`,
                                            }}
                                        >
                                            Chi tiết
                                        </Link>
                                    </td>
                                    <td>
                                        <Link
                                            to={{
                                                pathname:
                                                    "/device/listDevice/updateDevice",
                                                search: `deviceId=${value.id}`,
                                            }}
                                        >
                                            Cập nhật
                                        </Link>
                                    </td>
                                </tr>
                            )
                        )}
                    </table>

                    <CustomPagination
                        itemsPerPage={itemsPerPage}
                        totalItems={data.length} //data.length
                        onPageChange={handlePageChange}

                    />
                </div>

                <Link to="/device/listDevice/addDevice" className="button-add">
                    <img src={images.add.default} alt="" />
                    <br />
                    Thêm dịch vụ
                </Link>
            </div>
        </div>
    );
}

export default DevicePage;
