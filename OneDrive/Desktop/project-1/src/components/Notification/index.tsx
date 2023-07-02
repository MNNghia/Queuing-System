import { useEffect} from "react";
import "./Notification.scss";
import { useSelector } from "react-redux";
import { fetchNoti } from "../../redux/reducers/notification";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch } from "react-redux";

interface Noti {
    id: string;
    name: string;
    time: string;
    date: string;
}

function Notification() {
    const dispatch = useDispatch<AppDispatch>();

    const { data, loading, error } = useSelector(
        (state: RootState) => state.noti
    );

    console.log(data);

    ////get data
    useEffect(() => {
        dispatch(fetchNoti());
    }, [dispatch]);

    

    return (
        <div className="wrapper-notification">
            <div className="title">Thông báo</div>
            {data[0] && (
                <ul className="notification-items">
                    {
                        data.map((value, index) =>
                            <li className="notification-item" key={index}>
                        <p className="user">Người dùng: {value.name}</p>
                        <p className="date-time">
                            Thời gian nhận số: {value.time} ngày {value.date} 
                        </p>
                        <div className="horizontal-item"></div>
                    </li>
                        )
                    }
                    
    
                </ul>
            )}
        </div>
    );
}

export default Notification;
