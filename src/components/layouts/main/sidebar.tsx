import React from "react";
import MenuSidebar from "./MenuSidebar";
import NavbarMenu from "./navbar";

const SidebarMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="drawerMenu" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <NavbarMenu />
        {/* Page content here */}
        <div className="p-2">
          {children}
        </div>
      </div>
      <div className="drawer-side overflow-y-auto z-10">
        <label htmlFor="drawerMenu" className="drawer-overlay"></label>
        <MenuSidebar />
      </div>
    </div>
  );
};

export default SidebarMenu;
