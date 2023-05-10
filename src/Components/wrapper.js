import React from "react";
import SideNavbar from "./widget/SideNavbar";
import TopNavbar from "./widget/TopNavbar";

function Wrapper({ children }) {
  return (
    <div class="hk-wrapper hk-vertical-nav">
      <SideNavbar />
      <TopNavbar />
      <div class="hk-pg-wrapper" style={{ minHeight: "215px" }}>
        <div class="container-fluid pt-16">{children}</div>
      </div>
    </div>
  );
}

export default Wrapper;
