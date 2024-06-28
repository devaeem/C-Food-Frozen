"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import ListIcon from "@mui/icons-material/List";
import SettingsIcon from '@mui/icons-material/Settings';
import { usePathname } from "next/navigation";
const Sidebar = ({ isSidebarOpen , toggleSidebar}) => {
  const pathname = usePathname();


  const menu = [
    {
      name: "Dashboard",
      link: "/admin/dashboard",
      icon: <DashboardIcon className="mr-2" />,
    },
    {
      name: "รายการสินค้า",
      link: "/admin/product",
      icon: <ListIcon className="mr-2" />,
    },
    {
      name: "หมวดหมู่สินค้า",
      link: "/admin/category",
      icon: <CategoryIcon className="mr-2" />,
    },
    {
      name: "ตั่งค่าระบบ",
      link: "/admin/setting",
      icon: <SettingsIcon className="mr-2" />,
    },
  ];

  return (
    <>


      {isSidebarOpen && (
        // className="bg-gray-700  min-h-screen md:flex lg:flex flex-col justify-between hidden"

        <aside
          className={`bg-gray-700 min-h-screen flex md:flex lg:flex flex-col justify-between transition-transform duration-700   ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:w-64 lg:w-64  md:flex lg:flex top-0 left-0 z-50`}
        >
          <div className="container mx-auto border-b-2 border-white">
            <div className="flex items-center justify-between py-4">
              <Link href="/admin">
                <h2 className="text-white text-3xl font-semibold">FoodAdmin</h2>
              </Link>
            </div>
          </div>

          <div className="flex-1 mt-3">
            <ul>
              {menu.map((item, index) => (
                <>
                  <li key={index} className="mb-2">
                    <Link
                      href={item.link}

                      className={` text-white px-4 py-2 rounded flex items-center cursor-pointer
              ${
                item.link === pathname
                  ? "bg-gray-500 text-white hover:bg-gray-600"
                  : "hover:bg-gray-600"
              }`}
                    >
                      <h1>
                        {item.icon} {item.name}
                      </h1>
                    </Link>
                  </li>
                </>
              ))}
            </ul>
          </div>
          <div className="p-4">
            <p className="text-white text-center font-extrabold">FUI V.1.0</p>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
