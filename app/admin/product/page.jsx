"use client";
import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/adminLayout";
import { useQuery } from "@tanstack/react-query";
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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"
import {
  getProduct
} from "../../../func/productapi";
import DialogDel from "../../components/admin/product/dialogDel";
import DialogEdit from "../../components/admin/product/dialogEdit";
const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [success, setSuccess] = useState(false);
  const [successEdit, setSuccessEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [isOpenDialogDel, setIsOpenDialogDel] = useState(false);
  const [isOpenDialogEdit, setIsOpenDialogEdit] = useState(false);
  const [editId, setEditId] = useState("");
  


  const token = session?.user?.accessToken;
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);


  const {
    isPending,
    error,
    data: listDataProduct,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["list-data-product", { search, page, pageSize }],
    queryFn: async () => {
      try {
        const res = await getProduct(search, page, pageSize);
        setTotalPages(res.data.totalPages);
        return res.data.products;
      } catch (err) {
        throw err;
      }
    },
  });

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };



  const handleClickOpenEdit = (id) => {
    setIsOpenDialogEdit(true);
    setEditId(id);
  };

  const handleClickOpenDel = (id) => {
    setIsOpenDialogDel(true);
    setEditId(id);
  };



  return (
    <AdminLayout>
      <div className="flex flex-col items-start justify-start gap-3">
        <h1 className="text-4xl font-extrabold ">รายการสินค้า</h1>

        {success && (
          <div className="mt-2 p-2 rounded-md">
            <Alert severity="success">
              {" "}
              เพื่มสินค้าสำเร็จ
              <IconButton onClick={() => setSuccess(false)}>
                <ClearIcon />
              </IconButton>
            </Alert>
          </div>
        )}

        {successEdit && (
          <div className="mt-2 p-2 rounded-md">
            <Alert severity="success">
              {" "}
              อัพเดพสินค้าสำเร็จ
              <IconButton onClick={() => setSuccessEdit(false)}>
                <ClearIcon />
              </IconButton>
            </Alert>
          </div>
        )}

        {del && (
          <div className="mt-2 p-2 rounded-md">
            <Alert severity="success">
              {" "}
              ลบสินค้าสำเร็จ
              <IconButton onClick={() => setDel(false)}>
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
            ค้นหาสินค้า
          </label>
          <input
            type="text"
            id="searchName"
            onChange={(e) => setSearch(e.target.value)}
            className="mt-1 block w-50 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
            required
            placeholder="ค้นหาสินค้า"
            value={search}
          />
        </div>
        {listDataProduct?.length === 0 ? (
          <div className="mt-4 p-2 rounded-md">
            <Alert severity="info">ไม่พบข้อมูลสินค้า</Alert>
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
                {listDataProduct?.map((product, index) => (
                  <>
                    <tbody className="bg-white divide-y divide-gray-200  ">
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.images[0]?.url ? (
                            <Image
                              src={product.images[0]?.url}
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
                          {product.Category?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 overflow-hidden text-ellipsis ">
                          <div dangerouslySetInnerHTML={{__html:product.desc}}></div>

                        </td>
                        <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium ">
                          <div className="flex items-center justify-start gap-2">
                            <Button
                              variant="contained"
                              startIcon={<CreateIcon />}
                              onClick={() => handleClickOpenEdit(product.id)}
                            >
                              แก้ไข
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={<DeleteIcon />}
                              onClick={() => handleClickOpenDel(product.id)}
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
          refetch={refetch}
          token={token}
        />
      )}

      {isOpenDialogEdit && (
        <DialogEdit
          handleClose={() => {
            setIsOpenDialogEdit(false);
          }}
          editId={editId}
          setSuccessEdit={setSuccessEdit}
          refetch={refetch}
          token={token}
        />
      )}

      {isOpenDialogDel && (
        <DialogDel
          handleClose={() => {
            setIsOpenDialogDel(false);
          }}
          editId={editId}
          refetch={refetch}
          setDel={setDel}
          token={token}
        />
      )}
    </AdminLayout>
  );
};

export default Page;
