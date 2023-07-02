import { combineReducers } from "redux";
import {usersReducer} from './login/login'
import Breadcrumb from "./Breadcrumb/Breadcrumb";

export default combineReducers({
    users: usersReducer,
    breadcrumb: Breadcrumb
})
