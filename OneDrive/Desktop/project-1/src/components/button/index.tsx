import './button.scss'
type CustomButtonProps = {
    text: String
    type: 'BtnDefault' | 'BtnOutline' | 'BtnBlur'
    onClick?: () => any
}

function CustomButton({text, type, onClick}: CustomButtonProps) {
    return (  
        <div className={`${type}`} role="button" tabIndex={-1} onClick={onClick}>{text}</div>
    );
}

export default CustomButton;