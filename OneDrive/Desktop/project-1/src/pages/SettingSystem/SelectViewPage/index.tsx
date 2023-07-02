import { Select } from "antd";
import images from "../../../assests/images";
import CustomButton from "../../../components/button";
import "./SelectView.scss";
import { Link } from "react-router-dom";

function SelectViewPage() {
    return (
        <div className="wrapper-selectView">
            <div className="wrapper-selectView__header">
                <img src={images.logo} alt="" className="header-logo" />
                <div className="btnLogOut">
                    <img src={images.logout.default} alt="" />
                    <CustomButton type="BtnBlur" text="Log out" />
                </div>
            </div>
            <div className="wrapper-selectView__title title">Cài đặt thiết bị KIO_01</div>
            <div className="wrapper-selectView__content">
                <div className="content-header">Các lựa chọn hiển thị:</div>
                <Select
                                    mode="multiple"
                                    className="select"
                                    defaultValue={'a'}
                                    style={{
                                        width: "100%",
                                        fontSize: "18px",
                                        cursor: "pointer",
                                        color: "#fff",
                                    }}
                                    placeholder="Nhập dịch vụ sử dụng"
                                    // onChange={}
                                    
                                />
            </div>

            <Link to="/service/addService" className="button-add" style={{top: '183px'}}>
                        <img src={images.setting.default} alt="" /><br/>
                        Cài đặt
                    </Link>
        </div>
    );
}

export default SelectViewPage;
