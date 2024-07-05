"use client";
import React, { useState,useEffect } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSession,signOut } from "next-auth/react"
import { useRouter } from "next/navigation";

const Nav = ({setIsSidebarOpen,toggleSidebar}) => {

  const router = useRouter();
  const { data: session, status } = useSession();


  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <nav className="bg-gray-800 p-4 flex  items-center justify-between">
        <div className="flex  gap-3">
          <Button
            variant="contained"
            onClick={toggleSidebar}
            className="bg-gray-400 hover:bg-gray-500 text-white"
          >
            <MenuIcon />
          </Button>
        </div>
        <div className=" flex gap-4">
          <Avatar sx={{ bgcolor: deepOrange[500] }} onClick={handleClick}>
           {session?.user?.username}
          </Avatar>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>
              <Button
                variant="contained"
                startIcon={<LogoutIcon />}
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="bg-red-800 hover:bg-red-600 text-white   md:flex lg:flex"
              >
                ออกจากระบบ
              </Button>
            </MenuItem>
          </Menu>
        </div>
      </nav>
    </>
  );
};

export default Nav;
