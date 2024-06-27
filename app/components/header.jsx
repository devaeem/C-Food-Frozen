import React from "react";

const Header = () => {
  return (
    <>
<div className=" w-full max-h-[120px] border-b-2 border-cyan-600 shadow-lg">
    <div className="container mx-auto">
        <div className="flex justify-between items-center h-[120px]">
            <div className="text-black font-bold text-5xl p-8">C-Food&Frozen</div>
            <div className="flex items-center space-x-5">
                <div className="text-black font-bold">เข้าสู่ระบบ</div>
                <div className="text-black font-bold">
                    <button className="bg-cyan-300 text-black px-3 py-1 rounded-full h-[45px] shadow-md transition duration-300">
                        รถเข็น
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>


    </>
  );
};

export default Header;
