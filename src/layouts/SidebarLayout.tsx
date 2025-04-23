import { Outlet } from "react-router-dom";
import Sidebar from "@components/Sidebar";

const SidebarLayout = () => {
    return (
        <main className="pr-[var(--sidebar-width)]">
            <Sidebar />
            <Outlet />
        </main>
    );
};

export default SidebarLayout;
