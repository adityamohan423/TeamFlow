import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
const AppLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
    </>
  );
};

export default AppLayout;
