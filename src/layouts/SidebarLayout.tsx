import { Outlet } from "react-router-dom";
import Sidebar from "@components/Sidebar";

const SidebarLayout = () => {
  return (
    <div className="flex justify-end">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default SidebarLayout;
