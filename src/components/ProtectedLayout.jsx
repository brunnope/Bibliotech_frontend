import Navbar from "./navBar/Navbar";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const currentYear = new Date().getFullYear(); 

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ flex: "1" }}>
        <Outlet />
      </div>
      <footer
        style={{
          backgroundColor: "#ffffff",
          textAlign: "center",
          padding: "10px 0",
          borderTop: "1px solid #ddd",
          boxShadow: "0px -1px 4px rgba(0, 0, 0, 0.30)" 
        }}
      >
        &copy; {currentYear} Bibliotech
      </footer>
    </div>
  );
};

export default ProtectedLayout;