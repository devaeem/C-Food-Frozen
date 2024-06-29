"use client";
import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/adminLayout";
import DialogProduct from "../../components/admin/product/dialogproduct";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import Pagination from "@mui/material/Pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Image from "next/image";
import { getProduct } from "../../../func/productapi";
const Page = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    LoadData(search, page, pageSize);
  }, [search, page, pageSize]);
  const LoadData = (search, page, pageSize) => {
    getProduct(search, page, pageSize)
      .then((res) => {
        setProductList(res.data.product);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };
  return (
    <AdminLayout>
      <div className="flex flex-col items-start justify-start gap-3">
        <h1 className="text-4xl font-extrabold ">รายการสินค้า</h1>

        {success && (
          <div className="mt-2 p-2 rounded-md">
            <Alert severity="success">
              {" "}
              ลบหมวดหมู่สินค้าสำเร็จ
              <IconButton onClick={() => setSuccess(false)}>
                <ClearIcon />
              </IconButton>
            </Alert>
          </div>
        )}
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
          <label
            htmlFor="categoryName"
            className="block text-lg font-medium text-gray-700"
          >
            ค้นหาหมวดหมู่สินค้า
          </label>
          <input
            type="text"
            id="searchName"
            onChange={(e) => setSearch(e.target.value)}
            className="mt-1 block w-50 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
            required
            placeholder="ค้นหาหมวดหมู่สินค้า"
            value={search}
          />
        </div>
        {productList.length === 0 ? (
          <div className="mt-4 p-2 rounded-md">
            <Alert severity="info">ไม่พบข้อมูลหมวดหมู่สินค้า</Alert>
          </div>
        ) : (
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
                {productList.map((product, index) => (
                  <>
                    <tbody className="bg-white divide-y divide-gray-200  ">
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.image ? (
                            <Image
                              src={product.image}
                              width={120}
                              height={120}
                              alt="Picture of the author"
                              // style={{ objectFit: "contain" }}
                            />
                          ) : (
                            "ไม่มีรูปภาพ"
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.categoryRef?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.desc}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium ">
                          <div className="flex items-center justify-start gap-2">
                            <Button
                              variant="contained"
                              startIcon={<CreateIcon />}
                            >
                              แก้ไข
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={<DeleteIcon />}
                            >
                              ลบ
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </>
                ))}
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="flex mt-9 items-center justify-center">
        <Pagination
          count={totalPages}
          color="primary"
          page={page}
          onChange={handlePageChange}
        />
      </div>
      {isOpenDialog && (
        <DialogProduct
          handleClose={() => {
            setIsOpenDialog(false);
          }}
          setSuccess={setSuccess}
          loadData={LoadData}
        />
      )}
    </AdminLayout>
  );
};

export default Page;
