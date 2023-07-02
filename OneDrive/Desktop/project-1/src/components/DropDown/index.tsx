import "./DropDown.scss";
import images from "../../assests/images";
import { useEffect, useState } from "react";

interface DropDownProps {
    type: "stateActive" | "stateConnect" | "typeDevice" | 'service' | 'state' | 'source'|'serviceName' | 'role' | 'roleAdd' | 'stateActiveAdd';
    label: string;
    placeholder?: string;
    require?: boolean;
    value?: string;
    onClick: (value: string) => void;
}

function DropDown({
    type,
    label,
    placeholder,
    onClick,
    require,
    value
}: DropDownProps) {
    const [dropdown, setDropdown] = useState(false);
    const [active, setActive] = useState(0);
    const [activeValue, setActiveValue] = useState("");
    

    const stateActive = ["Tất cả", "Hoạt động", "Ngưng hoạt động"];
    const stateConnect = ["Tất cả", "Kết nối", "Mất kết nối"];
    const typeDevice = ["Kiosk", "Display counter"];
    const service = ["Khám tim mạch", 'Khám sản-Phụ khoa', 'Khám răng hàm mặt', 'Khám tai mũi họng']
    const state = ["Tất cả","Đang chờ", 'Đã sử dụng', 'Bỏ qua']
    const source = ["Tất cả", "Kiosk"]
    const serviceName = ["Tất cả", 'Khám sản - Phụ khoa', 'Khám răng hàm mặt', 'Khám tai mũi họng']
    const role = ["Tất cả", "Kế toán", "Bác sĩ", "Lễ tân", "Quản lý", "Admin", "Superadmin"]
    const roleAdd = ["Kế toán", "Bác sĩ", "Lễ tân", "Quản lý", "Admin", "Superadmin"]
    const stateActiveAdd = [ "Hoạt động", "Ngưng hoạt động"]
    var data;


    useEffect(() => {
        if(value) {
        setActiveValue(value)
    }
    },[value, activeValue])
    

    if (type === "stateActive") {
        data = stateActive;
    } else if (type === "stateConnect") {
        data = stateConnect;
    } else if (type === "typeDevice") {
        data = typeDevice;
    } else if( type === 'service') {
        data = service
    } else if( type === 'state') {
        data = state
    } else if( type === 'source'){
        data = source
    } else if( type === 'serviceName') {
        data = serviceName
    } else if( type === 'role') {
        data = role
    } else if( type === 'roleAdd') {
        data = roleAdd
    } else if( type === 'stateActiveAdd') {
        data = stateActiveAdd
    }



    return (
        <div className="dropdown">
            <div
                className="dropdown-label"
                style={type === "typeDevice" ? { fontSize: "18px" } : {}}
            >
                {label}
                {require && <span className="require">*</span>}
            </div>
            {dropdown ? (
                <div
                    className="overlay"
                    onClick={() => setDropdown(false)}
                ></div>
            ) : (
                ""
            )}
            <div
                className={
                    dropdown ? "dropdown-content active" : "dropdown-content"
                }
                onClick={() => setDropdown(dropdown ? false : true)}
            >
                <div
                    className="dropdown-content__select"
                    style={
                        type === "typeDevice"
                            ? { padding: "12px 16px", borderRadius: "6px" }
                            : {}
                    }
                >
                    {(type === 'typeDevice' || type==='service' || type==='roleAdd' ) && placeholder !== undefined && (data === typeDevice || data === service || data === roleAdd  ? (
                        activeValue !== "" ? (
                            activeValue
                        ) : (
                            <p
                                style={{
                                    fontSize: "18px",
                                    color: "#A9A9B0",
                                    margin: "0",
                                }}
                            >
                                {placeholder}
                            </p>
                        )
                    ) : (
                        ""
                    ))}
                    {
                        type==='stateActive' && (data === stateActive && activeValue !== undefined && activeValue !== '' ? activeValue : stateActive[0])
                    }
                    {
                        type==='state' && (data === state && activeValue !== undefined && activeValue !== '' ? activeValue : state[0])
                    }
                    {
                        type==='source' && (data === source && activeValue !== undefined && activeValue !== '' ? activeValue : source[0])
                    }
                    {
                        type==='serviceName' && (data === serviceName && activeValue !== undefined && activeValue !== '' ? activeValue : serviceName[0])
                    }
                    {
                        type==='role' && placeholder === undefined &&(data === role && activeValue !== undefined && activeValue !== '' ? activeValue : role[0])
                    }
                    {
                        type==='stateActiveAdd' && placeholder === undefined &&(data === stateActiveAdd && activeValue !== undefined && activeValue !== '' ? activeValue : stateActiveAdd[0])
                    }
                    {/* {<p style={{fontSize: '18px', color: "#A9A9B0", margin: "0"}}>placeholder</p>  || data?.[0]} */}
                    <img src={images.vector.default} alt="" />
                </div>
                <ul className="dropdown-content__option">
                    {data?.map((value, index) => (
                        <li
                            className={
                                active === index
                                    ? "dropdown-content__option-item active"
                                    : "dropdown-content__option-item"
                            }
                            key={index}
                            onClick={() => {
                                setActive(index);
                                setActiveValue(value);
                                onClick(value);
                            }}
                        >
                            {value}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DropDown;
