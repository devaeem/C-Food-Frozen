"use client";
import React, { useState } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
const Header = () => {
  const menuItems = [
    { id: 1, name: "หน้าแรก", link: "/" },
    { id: 2, name: "เข้าสู่ระบบ", link: "/login" },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      {/* <div className=" w-full max-h-[120px] border-b-2 border-cyan-600 shadow-lg">
        <div className="px-5 md:container md:mx-auto">
          <div className="flex  items-center  justify-between  h-[120px]">
            <Link href="/">
              <div className="text-black font-bold md:text-4xl p-8  ">
                C-Food&Frozen
              </div>
            </Link>
            <div className="hidden md:flex xl:flex lg:flex items-center space-x-5 gap-4  ">
              {menuItems.map((item, i) => (
                <>
                  <Link key={i} href={item.link}>
                    <div className="text-black font-bold">{item.name}</div>
                  </Link>
                </>
              ))}
            </div>

            <div className="flex items-center justify-between  md:hidden lg:hidden ml-4">
              <button className="bg-orange-400  p-2 rounded">==</button>
            </div>
          </div>
        </div>
      </div> */}

      <div className="w-full max-h-[120px] border-b-2 border-cyan-600 shadow-lg">
        <div className="px-5 md:container md:mx-auto">
          <div className="flex items-center justify-between h-[120px]">
            <Link href="/">
              <div className="text-black font-bold text-xl md:text-4xl p-2 md:p-8">
                C-Food&Frozen
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-5">
              {menuItems.map((item, i) => (
                <Link key={i} href={item.link}>
                  <div className="text-black font-bold">{item.name}</div>
                </Link>
              ))}
            </div>
            <div className="flex items-center md:hidden ml-4">
              <Button
                className="rounded"
                variant="contained"
                onClick={toggleDropdown}
              >
                <MenuIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          dropdownOpen ? "max-h-[500px]" : "max-h-0"
        } overflow-hidden transition-max-height duration-500 ease-in-out bg-white md:hidden mt-2 rounded-lg shadow-lg`}
      >
        {menuItems.map((item, i) => (
          <Link key={i} href={item.link}>
            <div className="text-black font-bold p-4 hover:bg-gray-100 transition duration-300">
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Header;
