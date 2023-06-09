import Breadcrumb from "../../components/Breadcrumb";
import Notification from "../../components/Notification";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BreadcrumbItem } from "../../redux/reducers/Breadcrumb/Breadcrumb";
import { RootState } from "../../redux/store";

function Header() {
    const [notifi, setNotifi] = useState(false);

    const breadcrumbItems: BreadcrumbItem[] = useSelector(
        (state: RootState) => state.breadcrumb
    );


    const hideNotifi = () => {
        setNotifi(false);
    };

    return (
        <div className="header">
            <Breadcrumb items={breadcrumbItems} />
            <div className="header-items">
                <div className="header-items__icon-notification">
                    {notifi && (
                        <div className="overlay" onClick={hideNotifi}></div>
                    )}

                    <div className="list-notification">
                        <div
                            className={
                                notifi
                                    ? "background-icon active"
                                    : "background-icon"
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="23"
                                height="23"
                                viewBox="0 0 20 20"
                                fill="none"
                                className="notifi-icon"
                                onClick={() => setNotifi(notifi ? false : true)}
                            >
                                <path
                                    d="M16.1167 12.0753L15.2833 10.692C15.1083 10.3837 14.95 9.80033 14.95 9.45866V7.35033C14.95 5.39199 13.8 3.70033 12.1417 2.90866C11.7083 2.14199 10.9083 1.66699 9.99166 1.66699C9.08333 1.66699 8.26666 2.15866 7.83333 2.93366C6.20833 3.74199 5.08333 5.41699 5.08333 7.35033V9.45866C5.08333 9.80033 4.92499 10.3837 4.74999 10.6837L3.90833 12.0753C3.57499 12.6337 3.49999 13.2503 3.70833 13.817C3.90833 14.3753 4.38333 14.8087 4.99999 15.017C6.61666 15.567 8.31666 15.8337 10.0167 15.8337C11.7167 15.8337 13.4167 15.567 15.0333 15.0253C15.6167 14.8337 16.0667 14.392 16.2833 13.817C16.5 13.242 16.4417 12.6087 16.1167 12.0753Z"
                                    fill="#FFAC6A"
                                />
                                <path
                                    d="M12.3584 16.6753C12.0084 17.642 11.0834 18.3337 10 18.3337C9.34169 18.3337 8.69169 18.067 8.23336 17.592C7.96669 17.342 7.76669 17.0087 7.65002 16.667C7.75836 16.6837 7.86669 16.692 7.98336 16.7087C8.17502 16.7337 8.37502 16.7587 8.57502 16.7753C9.05002 16.817 9.53336 16.842 10.0167 16.842C10.4917 16.842 10.9667 16.817 11.4334 16.7753C11.6084 16.7587 11.7834 16.7503 11.95 16.7253C12.0834 16.7087 12.2167 16.692 12.3584 16.6753Z"
                                    fill="#FFAC6A"
                                />
                            </svg>
                        </div>

                        <div className="toast-notification">
                            {notifi && <Notification />}
                        </div>
                    </div>
                </div>
                <Link to="/user" style={{ textDecoration: "none" }}>
                    <div className="header-items__user">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmEedEwy284CMHPcPoYXz8i9K1BkGpLyHRUo2IleoVqnEa9cVD3pgtZdu0AHVQUnTDqKY&usqp=CAU"
                            alt=""
                            className="user-avatar"
                        />
                        <div className="user-description">
                            <div className="user-description__hello">
                                Xin chào
                            </div>
                            <div className="user-description__name">
                                Nguyễn Minh Nghĩa
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Header;
