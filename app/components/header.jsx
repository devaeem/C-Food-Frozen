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
        <div className="container mx-auto">
          <div className="flex justify-between items-center h-[120px]">
            <Link href="/">
              <div className="text-black font-bold text-5xl p-8">
                C-Food&Frozen
              </div>
            </Link>
            <div className="flex items-center space-x-5 gap-4">
              {menuItems.map((item,i) => (
                <>
                  <Link key={i} href={item.link}>
                    <div className="text-black font-bold">{item.name}</div>
                  </Link>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
