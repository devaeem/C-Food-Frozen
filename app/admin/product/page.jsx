"use client";
import React, { useState } from "react";
import AdminLayout from "../../components/admin/adminLayout";
import DialogProduct from "../../components/admin/dialogproduct";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from '@mui/icons-material/Create';
import Pagination from "@mui/material/Pagination";
import DeleteIcon from '@mui/icons-material/Delete';
const Page = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };
  return (
    <AdminLayout>
      <div className="flex flex-col items-start justify-start gap-3">
        <h1 className="text-4xl font-extrabold ">รายการสินค้า</h1>
        <div className="py-2">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
          >
            เพิ่มสินค้า
          </Button>
        </div>

        <div className="flex-1 mt-8 w-full">
          <h1 className="text-xl font-extrabold">รายการสินค้า</h1>
          <div className="mt-4 overflow-hidden border-b border-gray-200 sm:rounded-lg w-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ลำดับ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ชื่อสินค้า
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    รูปภาพสินค้า
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    หมวดหมู่สินค้า
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                  ราคาสินค้า
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                รายละเอียดสินค้า
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    การจัดการ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200  ">
                <tr key={1}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    test
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    test
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    test
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    test
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    test
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium ">
                    <div className="flex items-center justify-start gap-2">
                      <Button variant="contained" startIcon={<CreateIcon/>}>แก้ไข</Button>
                      <Button variant="outlined" startIcon={<DeleteIcon/>}>ลบ</Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex mt-9 items-center justify-center">
        <Pagination count={10} color="primary" />
      </div>
      {isOpenDialog && (
        <DialogProduct
          handleClose={() => {
            setIsOpenDialog(false);
          }}
        />
      )}
    </AdminLayout>
  );
};

export default Page;
