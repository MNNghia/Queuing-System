import "./DiaryAction.scss";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch } from "react-redux";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import CustomInput from "../../../components/input/CustomInput";
import images from "../../../assests/images";
import { Link } from "react-router-dom";
import CustomPagination from "../../../components/Pagination";
import { useSelector } from "react-redux";
import { fetchDiary, updateDiary } from "../../../redux/reducers/diary";
import { useCookies } from "react-cookie";

function DiaryActionPage() {
    const dispatch = useDispatch<AppDispatch>();

    const { data, loading, error } = useSelector(
        (state: RootState) => state.diary
    );

    ////get data
    useEffect(() => {
        dispatch(fetchDiary());
        
    }, [dispatch]);


    //update data 

    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState<any>();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const [dataPage, setDataPage] = useState<any>();


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    //Pagination
    useEffect(() => {
        if (searchResult) {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const slicedData = searchResult.slice(startIndex, endIndex);
                setDataPage(slicedData);
        }
    }, [currentPage, searchResult]);

    useEffect(() => {
        const handleSearch = () => {

                if (searchText) {
                const text = searchText.toLowerCase();

                const result = data.filter((value: any) =>
                        value.handle.toLowerCase().includes(text)
                    );
                    setSearchResult(result)
                } else {
                    setSearchResult(data)
                }
        }
        handleSearch()
        
    }, [data, searchText])

    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Cài đặt hệ thống", url: "" },
            { label: "Nhật ký hoạt động", url: "/settingSystem/diaryAction" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);

    const onChange: DatePickerProps["onChange"] = (date, dateString) => {
        console.log(date, dateString);
    };
    return (
        <div className="wrapper-diaryAction">
            <div className="title">Quản lý cấp số</div>
            <div className="wrapper-diaryAction__content">
                <div className="content-filter">
                    <div className="content-filter__item data-time-item">
                        <p className="date-time__label">Chọn thời thời gian</p>
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

                    <div className="content-filter__item" style={{position: 'relative', bottom: '-15px'}}>
                        <CustomInput
                            type="search"
                            label="Từ khóa"
                            placeholder="nhập từ khóa"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            
                        />
                    </div>
                </div>
                <div className="content-table">
                    <table className="wrapper-table">
                        <tbody>
                            <tr>
                                <th>Tên đăng nhập</th>
                                <th>Thời gian tác động</th>
                                <th>IP thực hiện</th>
                                <th>Thao tác thực hiện</th>
                            </tr>
                            {
                                dataPage && dataPage.map((value: any, index: number) =><tr key={index} className={index % 2 !==0 ? 'even': ''}>
                                <td>{value.userName}</td>
                                <td>{value.time}</td>
                                <td>{value.IP}</td>
                                <td>Cập nhật dữ liệu</td>
                            </tr> )
                            }
                            
                        </tbody>
                    </table>

                    <CustomPagination
                        itemsPerPage={itemsPerPage}
                        totalItems={data.length} //data.length
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default DiaryActionPage;
