import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="">
        <SideBar />
      </div>
      <div className="grow">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
