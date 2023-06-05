import "./DropDown.scss";
import images from "../../assests/images";
import { useEffect, useState } from "react";

interface DropDownProps {
    type: 'stateActive' | 'stateConnect' | 'typeDevice' 
    label: string
    placeholder?: string
    require?: boolean
    style?: {
    
    }
}

function DropDown({type, label, placeholder, style, require}: DropDownProps) {
    const [dropdown, setDropdown] = useState(false);
    const [active, setActive] = useState(0);

    const stateActive = ["Tất cả", "Hoạt động", "Ngưng Hoạt động"];
    const stateConnect = ['Tất cả', "Kết nối", "Mất kết nối"]
    const typeDevice = ['Kiosk', 'Display counter']

    var data

    if(type === 'stateActive') {
        data = stateActive
    } else if(type === "stateConnect"){
        data = stateConnect
    } else if(type === 'typeDevice') {
        data = typeDevice
    }

    return (
        <div className="dropdown">
            <div className="dropdown-label" style={type === 'typeDevice'?{fontSize: '18px'}:{}}>{label}{require && <span className="require">*</span>}</div>
            {dropdown ? <div className="overlay" onClick={() => setDropdown(false)}></div>: ''}
            <div
                className={
                    dropdown ? "dropdown-content active" : "dropdown-content"
                }
                onClick={() => setDropdown(dropdown ? false : true)}
                
            >
                <div className="dropdown-content__select" style={type === 'typeDevice'?{padding: "12px 16px", borderRadius: '6px'}:{}}>
                    {<p style={{fontSize: '18px', color: "#A9A9B0", margin: "0"}}>placeholder</p>  || data?.[0]}
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
                            onClick={() => setActive(index)}
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
