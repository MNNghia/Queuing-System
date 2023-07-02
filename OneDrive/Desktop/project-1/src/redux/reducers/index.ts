import { combineReducers } from "redux";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import { usersInfoReducer } from "./UserInfo";
import { NotiReducer } from "./notification";
import { devicesReducer } from "./device";
import { servicesReducer } from "./service";
import { numbersReducer } from "./number";
import { roleReducer } from "./role";

export default combineReducers({
    usersInfo: usersInfoReducer ,
    breadcrumb: Breadcrumb,
    noti: NotiReducer,
    device: devicesReducer,
    service: servicesReducer,
    number: numbersReducer,
    role: roleReducer
})
