import Navbar from "./navBar/Navbar";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const currentYear = new Date().getFullYear(); // Obtém o ano atual dinamicamente

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
        }}
      >
        &copy; {currentYear} Bibliotech
      </footer>
    </div>
  );
};

export default ProtectedLayout;