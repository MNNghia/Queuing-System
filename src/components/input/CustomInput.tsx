import { Input, Space } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./input.scss";

type CustomInputProps = {
    request?: boolean;
    placeholder: string;
    label: string;
    type: "text" | "password" | "email";
    value: string
    onChange : (e: any) => any
};

function CustomInput({ request, placeholder, label, type, onChange, value }: CustomInputProps) {

    return (
        <div className="form-group">
            <div>
                <label htmlFor="" >
                    {label}
                    <span>{request ? "*" : ""}</span>
                </label>
            </div>
            {type == "text" && (
                <Input placeholder={placeholder} autoComplete="off" value={value} onChange={onChange}/>
            )}
            {type == "password" && (
                <Input.Password
                    placeholder={placeholder}
                    className="input-password"
                    autoComplete="off"
                />
            )}
            {type == "email" && (
                <Input
                    type="email"
                    placeholder={placeholder}
                    className="input-password"
                    autoComplete="off"
                />
            )}
        </div>
    );
}

export default CustomInput;
