/* eslint-disable react/prop-types */
import Navbar from "../Navbar/Navbar";
import "./Layout.css";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="layout-container">
        <div className="content-container">{children}</div>
      </div>
    </>
  );
}

export default Layout;
