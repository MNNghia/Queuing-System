import "./DevicePage.scss";
import DashboardLayout from "../../layouts/Dashboard/DashboardLayout";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import DropDown from "../../components/DropDown";
import CustomInput from "../../components/input/CustomInput";
import { Link } from "react-router-dom";
import TruncateMarkup from "react-truncate-markup";
import images from "../../assests/images";
import CustomPagination from "../../components/Pagination";

function DevicePage() {
    const dispatch = useDispatch<AppDispatch>();

    const [isTruncated, setIsTruncated] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const data = [];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    //funtion render data in table
    // const renderData = () => {
    //     const startIndex = (currentPage - 1) * itemsPerPage;
    //     const endIndex = startIndex + itemsPerPage;
    //     const slicedData = data.slice(startIndex, endIndex);

    //     return slicedData.map((item, index) => (
    //         <tr key={index}>{/* Hiển thị dữ liệu trong bảng */}</tr>
    //     ));
    // };

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
        <DashboardLayout>
            <div className="wrapper-listDevice">
                <div className="title">Danh sách thiết bị</div>
                <div className="wrapper-listDevice-content">
                    <div className="wrapper-listDevice__filter">
                        <div className="wrapper-listDevice__filter-state">
                            <DropDown type="stateActive" label="Trạng thái hoạt động" />
                        </div>
                        <div className="wrapper-listDevice__filter-state">
                            <DropDown type="stateConnect" label="Trạng thái kết nối" />
                        </div>
                        <div className="filter-search">
                            <CustomInput
                                type="search"
                                label="Từ khóa"
                                placeholder="Nhập từ khóa"
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
                            <tr>
                                <td>KIO.01</td>
                                <td>Kiosk</td>
                                <td>192.168.1.10</td>
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
                                            <p>
                                                Lorem, ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Porro, voluptatem assumenda
                                                excepturi alias cupiditate iste
                                                quod ad. Ea voluptatem
                                                dignissimos officia at quaerat
                                                ad perferendis harum, maxime
                                                iure aperiam consequatur.
                                            </p>
                                        </TruncateMarkup>
                                    ) : (
                                        <p>
                                            Lorem, ipsum dolor sit amet
                                            consectetur adipisicing elit. Porro,
                                            voluptatem assumenda excepturi alias
                                            cupiditate iste quod ad. Ea
                                            voluptatem dignissimos officia at
                                            quaerat ad perferendis harum, maxime
                                            iure aperiam consequatur.
                                        </p>
                                    )}
                                    {isTruncated && (
                                        <div
                                            className="viewMore"
                                            onClick={toggleTruncate}
                                        >
                                            Xem thêm
                                        </div>
                                    )}
                                </td>
                                <td>
                                    <Link to="/device/listDevice/detailDevice">Chi tiết</Link>
                                </td>
                                <td>
                                    <Link to="">Cập nhật</Link>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>KIO.01</td>
                                <td>Kiosk</td>
                                <td>192.168.1.10</td>
                                <td>
                                    <img src={images.action.default} alt="" />
                                    Hoạt động
                                </td>
                                <td>
                                    <img src={images.action.default} alt="" />
                                    Kết nối
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
                                            <p>
                                                Lorem, ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Porro, voluptatem assumenda
                                                excepturi alias cupiditate iste
                                                quod ad. Ea voluptatem
                                                dignissimos officia at quaerat
                                                ad perferendis harum, maxime
                                                iure aperiam consequatur.
                                            </p>
                                        </TruncateMarkup>
                                    ) : (
                                        <p>
                                            Lorem, ipsum dolor sit amet
                                            consectetur adipisicing elit. Porro,
                                            voluptatem assumenda excepturi alias
                                            cupiditate iste quod ad. Ea
                                            voluptatem dignissimos officia at
                                            quaerat ad perferendis harum, maxime
                                            iure aperiam consequatur.
                                        </p>
                                    )}
                                    {isTruncated && (
                                        <div
                                            className="viewMore"
                                            onClick={toggleTruncate}
                                        >
                                            Xem thêm
                                        </div>
                                    )}
                                </td>
                                <td>
                                    <Link to="/device/listDevice/detailDevice">Chi tiết</Link>
                                </td>
                                <td>
                                    <Link to="">Cập nhật</Link>
                                </td>
                            </tr>
                            
                        </table>

                        <CustomPagination
                            itemsPerPage={itemsPerPage}
                            totalItems={1} //data.length
                            onPageChange={handlePageChange}
                        />
                    </div>

                    <Link to="/device/listDevice/addDevice" className="button-add">
                        <img src={images.add.default} alt="" /><br/>
                        Thêm dịch vụ
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default DevicePage;
