"use client";
import React, { useState } from "react";
import Nav from "./nav";
import Sidebar from "./sidebar";
import Content from "./content";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex flex-col flex-1 ">
          <Nav
            setIsSidebarOpen={setIsSidebarOpen}
            toggleSidebar={toggleSidebar}
          />

          <Content>{children}</Content>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
