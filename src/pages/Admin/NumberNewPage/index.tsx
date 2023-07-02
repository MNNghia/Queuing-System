import "./NumberNew.scss";
import {
    setBreadcrumb,
    BreadcrumbItem,
} from "../../../redux/reducers/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch } from "react-redux";
import CustomButton from "../../../components/button";
import images from "../../../assests/images";
import DropDown from "../../../components/DropDown";
import { addNumber, fetchNumber } from "../../../redux/reducers/number";
import { useSelector } from "react-redux";
import { addDays, format } from 'date-fns';
import { useCookies } from 'react-cookie';


interface Number {
    STT: string,
    expiry: string,
    nameClient: string,
    nameService: string,
    source: string,
    state: string,
    time: string
}


function NumberNewPage() {

    const dispatch = useDispatch<AppDispatch>();

    const { data} = useSelector(
        (state: RootState) => state.number
    );

    console.log(data)

    
    useEffect(() => {
        dispatch(fetchNumber());
    }, [dispatch]);

    const [cookies] = useCookies(['accessToken']);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [number, setNumber] = useState({} as Number )
    

    useEffect(() => {
        const breadcrumbItems: BreadcrumbItem[] = [
            { label: "Cấp số", url: "" },
            { label: "Danh sách cấp số", url: "/number" },
            { label: "Cấp số mới", url: "/number/numberNew" },
        ];
        dispatch(setBreadcrumb(breadcrumbItems));
    }, [dispatch]);



    const handleSTT = (value: any) => {
        const STT = String(data.length + 1).padStart(7, '0')
        const date = new Date()
        const futureDate = addDays(date, 5)
        const time = `${format(date, 'HH:mm')} - ${format(date, 'dd/MM/yy')}`
        const expiry = `${format(date, 'HH:mm')} - ${format(futureDate, 'dd/MM/yy')}`
        setNumber({...number, STT: STT, time: time, expiry: expiry, source: "Hệ thống", state: "Đang chờ",  nameClient: cookies.accessToken.name, nameService: value})
    
    }

    return (
        <div className="wrapper-numberNew">
            <div className="title">Quản lý cấp số</div>
            <div className="wrapper-number__content">
                <div className="number-content">
                    <div className="number-content__heading">Cấp số mới</div>
                    <div className="number-content__option">
                        Dịch vụ khác hàng lựa chọn
                    </div>
                    <div className="number-content__dropdown">
                        <DropDown
                            type="service"
                            label=""
                            placeholder="Chọn dịch vụ"
                            onClick={(value: string) => {
                                handleSTT(value)
                            }}
                        />
                    </div>

                    <div
                        className="wrapper-managerDevice__btn"
                        style={{ marginTop: "50px" }}
                    >
                        <CustomButton
                            type="BtnOutline"
                            text="Hủy bỏ"
                            onClick={() => {
                                window.history.back();
                            }}
                        />
                        <CustomButton
                            type="BtnDefault"
                            text="In số"
                            onClick={() => {
                                
                                if (
                                    number.STT && number.time && number.expiry && number.nameClient && number.nameService && number.source && number.state 
                                ) {
                                    setIsModalOpen(true);
                                    console.log(number)
                                    dispatch(addNumber(number));
                                }
        

                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Modal */}
            {
                isModalOpen && (
                    <div className="modal">
                        <div
                            className="overlay"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <div className="content">
                                <img
                                    src={images.cancel.default}
                                    alt=""
                                    className="icon-cancel"
                                    onClick={() => setIsModalOpen(false)}
                                />

                                <div className="content-description">
                                    <div className="heading">
                                        Số thứ tự được cấp
                                    </div>
                                    <div className="number">{number.STT}</div>
                                    <div className="positon">
                                        DV:{number.nameService}
                                        <span>(tại quầy số 1)</span>
                                    </div>
                                </div>
                                <div className="content-time">
                                    <div className="time-grant">
                                        Thời gian cấp: {number.time}
                                    </div>
                                    <div className="time-expiry">
                                        Hạn sử dụng: {number.expiry}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
}

export default NumberNewPage;
