import "./Admin.scss";
import Menubar from "../../components/Menubar";
import Header from "../../components/Header";

type AdminLayoutChildren = {
    children: React.ReactNode;
};

function AdminLayout({ children }: AdminLayoutChildren) {
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

export default AdminLayout;
