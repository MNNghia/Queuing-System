import "./DropDown.scss";
import images from "../../assests/images";
import { useEffect, useState } from "react";

// type DropDownProps = {
//     dropDown: 
// }

function DropDown() {
    const [dropdown, setDropdown] = useState(false);
    const [active, setActive] = useState(0);

    const stateActive = ["Tất cả", "Hoạt động", "Ngưng Hoạt động"];
    const stateConnect = ['Tất cả', "Kết nối", "Mất kết nối"]

    return (
        <div className="dropdown">
            <div className="dropdown-label">Trạng thái hoạt động</div>
            {dropdown ? <div className="overlay" onClick={() => setDropdown(false)}></div>: ''}
            <div
                className={
                    dropdown ? "dropdown-content active" : "dropdown-content"
                }
                onClick={() => setDropdown(dropdown ? false : true)}
            >
                <div className="dropdown-content__select">
                    Tất cả
                    <img src={images.vector.default} alt="" />
                </div>
                <ul className="dropdown-content__option">
                    {stateActive.map((value, index) => (
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
