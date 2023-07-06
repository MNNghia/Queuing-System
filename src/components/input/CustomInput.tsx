import { Input } from "antd";
import "./input.scss";
import { CSSProperties } from "react";
import images from "../../assests/images";


type CustomInputProps = {
    request?: boolean;
    placeholder?: string;
    label: string;
    type: "text" | "password" | "email" | "disabled" | "search";
    value?: any;
    onChange?: (e: any) => any;
    style?: CSSProperties;
    disabledValue?: string
};

function CustomInput({
    request,
    placeholder,
    label,
    type,
    onChange,
    value,
    style,
    disabledValue
}: CustomInputProps) {
    return (
        <div className="form-group">
            <div>
                <label htmlFor="">
                    {label}
                    <span>{request ? <span className="require">*</span> : ""}</span>
                </label>
            </div>
            {type === "text" && (
                <Input
                    placeholder={placeholder}
                    autoComplete="off"
                    value={value}
                    onChange={onChange}
                    style={style}
                     onPressEnter={() => {}}
                />
            )}
            {type === "password" && (
                <Input.Password
                    placeholder={placeholder}
                    className="input-password"
                    autoComplete="off"
                    onChange={onChange}
                    style={style}
                    value={value}
                     onPressEnter={() => {}}
                />
            )}
            {type === "email" && (
                <Input
                    type="email"
                    placeholder={placeholder}
                    className="input-password"
                    autoComplete="off"
                    style={style}
                     onPressEnter={() => {}}
                />
            )}
            {type === "disabled" && (
                <Input
                    disabled
                    style={style}
                    value={disabledValue}
                     onPressEnter={() => {}}
                />
            )}
            {type === "search" &&
                <Input  suffix={
                    <img src={images.search.default} alt=""/>
                } className="input-search" placeholder={placeholder} 
                onChange={onChange}
                 onPressEnter={() => {}}
                />
            }
        </div>
    );
}

export default CustomInput;
