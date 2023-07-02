import "./AccountManage.scss";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch } from "react-redux";
import DropDown from "../../../components/DropDown";
import CustomInput from "../../../components/input/CustomInput";
import images from "../../../assests/images";
import { Link } from "react-router-dom";
import CustomPagination from "../../../components/Pagination";
import { useSelector } from "react-redux";
import { fetchUsers } from "../../../redux/reducers/UserInfo";

function AccountManagePage() {
    const dispatch = useDispatch<AppDispatch>();

    const { data, loading, error } = useSelector(
        (state: RootState) => state.usersInfo
    );

    ////get data
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const [searchText, setSearchText] = useState("");
    const [searchResult, setSearchResult] = useState<any>();
    const [currentPage, setCurrentPage] = useState(1);
    const [role, setRole] = useState('Tất cả')
    const itemsPerPage = 10;
    const dataPage = [];

    useEffect(() => {
        const handleSearch = () => {
            if(role === "Tất cả") {
                var dataFill = data
            } else {
                dataFill = data.filter((value) => value.role === role)
            }

            // Thuật toán tìm kiếm chuỗi con Brute-Force
            const text = searchText.toLowerCase();

            const result = dataFill.filter((value) =>
                value.name.toLowerCase().includes(text)
            );

            setSearchResult(result);
        };
        handleSearch();
    }, [searchText, data, role]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Cài đặt hệ thống", url: "" },
            { label: "Quản lý tài khoản", url: "/settingSystem/accountManage" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);

    return (
        <div className="wrapper-accountManage">
            <div className="title">Danh sách tài khoản</div>
            <div className="wrapper-accountManage__content">
                <div className="content-filter">
                    <div className="content-filter__item drop-down">
                        <DropDown
                            type="role"
                            label="Tên vai trò"
                            onClick={(e) => setRole(e)}
                        />
                    </div>

                    <div className="content-filter__item">
                        <CustomInput
                            type="search"
                            label="Từ khóa"
                            placeholder="nhập từ khóa"
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                </div>
                <div className="content-table">
                    <table className="wrapper-table">
                        <tr>
                            <th>Tên đăng nhập</th>
                            <th>Họ tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>

                            <th>Vai trò</th>
                            <th>Trạng thái hoạt động</th>
                            <th></th>
                        </tr>
                        {searchResult && searchResult.map((value: any, index: any) => (
                            <tr
                                key={index}
                                className={index % 2 !== 0 ? "even" : ""}
                            >
                                <td>{value.userName}</td>
                                <td>{value.name}</td>
                                <td>{value.phone}</td>
                                <td>{value.email}</td>
                                <td>{value.role}</td>
                                <td>
                                    <img
                                        src={images.stopAction.default}
                                        alt=""
                                    />
                                    Ngưng hoạt động
                                </td>
                                <td>
                                    <Link
                                            to={{
                                                pathname:
                                                    "/settingSystem/accountManage/updateAccount",
                                                search: `accountId=${value.id}`,
                                            }}
                                        >
                                            Cập nhật
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

                <Link
                    to="/settingSystem/accountManage/addAccount"
                    className="button-add"
                >
                    <img src={images.add.default} alt="" />
                    <br />
                    Thêm tài khoản
                </Link>
            </div>
        </div>
    );
}

export default AccountManagePage;
