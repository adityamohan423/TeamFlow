import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
const AppLayout = () => {
  return (
    <div className="h-screen overflow-hidden font-sans">
      <Navbar />
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
