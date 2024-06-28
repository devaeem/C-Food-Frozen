import React from "react";
import Link from "next/link";
const Header = () => {
  const menuItems = [
    { id: 1, name: "หน้าแรก", link: "/" },
    { id: 2, name: "เข้าสู่ระบบ", link: "/login" },
  ];

  return (
    <>
      <div className=" w-full max-h-[120px] border-b-2 border-cyan-600 shadow-lg">
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
      </div>
    </>
  );
};

export default Header;
