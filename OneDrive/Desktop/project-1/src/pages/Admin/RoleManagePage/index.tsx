import './RoleManage.scss'
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch } from "react-redux";
import CustomInput from "../../../components/input/CustomInput";
import images from "../../../assests/images";
import { Link } from "react-router-dom";
import { fetchRole } from '../../../redux/reducers/role';
import { useSelector } from 'react-redux';

function RoleManagePage() {
    const dispatch = useDispatch<AppDispatch>();

    const { data, loading, error } = useSelector(
        (state: RootState) => state.role
    );

    ////get data
    useEffect(() => {
        dispatch(fetchRole());
    }, [dispatch]);

    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Cài đặt hệ thống", url: "" },
            { label: "Quản lý vai trò", url: "/settingSystem/roleManage" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);
    return (  
            <div className="wrapper-roleManage">
                <div className="title">Danh sách vai trò</div>
                <div className="wrapper-roleManage__content">
                    <div className="content-filter">
                        <div className="content-filter__item">
                            <CustomInput type="search" label="Từ khóa" placeholder="nhập từ khóa" />
                        </div>
                    </div>
                    <div className="table-content">
                        <table className="wrapper-table">
                            <tr>
                                <th>Tên vai trò</th>
                                <th>Số người dùng</th>
                                <th>Mô tả</th>
                                <th></th>
                            </tr>
                            {
                                data.map((value, index) => <tr className={index % 2 !==0? "even": ''} key={index}>
                                <td>{value.nameRole}</td>
                                <td>{}</td>
                                <td>{value.description}</td>
                                <td>
                                    <Link
                                        to={{
                                            pathname: "/settingSystem/roleManage/updateRole",
                                            search: `roleId=${value.id}`,
                                        }}
                                    >
                                        Cập nhật
                                    </Link>
                                </td>
                            </tr>)
                            }
                        </table>
                    </div>

                    <Link to="/settingSystem/roleManage/addRole" className="button-add">
                        <img src={images.add.default} alt="" /><br/>
                        Thêm vai trò
                    </Link>
                </div>
            </div>
    );
}

export default RoleManagePage;