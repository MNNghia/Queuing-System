import "./DashboardLayout.scss";
import Menubar from "../../components/Menubar";
import Header from "../../components/Header";

type DashboardLayoutChildren = {
    children: React.ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutChildren) {
    return (
        <>
            <div className="wrapper-admin">
                <Menubar />
                <div className="container">
                    <Header />
                    <div className="content">{children}</div>
                </div>
            </div>
        </>
    );
}

export default DashboardLayout;
