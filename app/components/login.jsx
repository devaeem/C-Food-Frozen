"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("users", { email, password });
    alert(email + " " + password);
  };
  return (
    <>
      <div className="min-h-screen flex items-start justify-center  ">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-[1rem]">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            เข้าสู่ระบบ
          </h2>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                อีเมล
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                รหัสผ่าน
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              {/* <button
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSubmit}
                disabled={password.length > 6}
              ></button> */}
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={password.split("").length < 6}
              >
                เข้าสู่ระบบ
              </Button>

              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                ลืมรหัสผ่าน?
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
