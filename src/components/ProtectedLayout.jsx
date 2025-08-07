import Navbar from "./navBar/Navbar";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default ProtectedLayout;
