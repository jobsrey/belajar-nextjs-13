"use client";
import NavbarMenu from "./navbar";
import SidebarMenu from "./sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <SidebarMenu>
        {children}
      </SidebarMenu>
  );
};

export default MainLayout;
