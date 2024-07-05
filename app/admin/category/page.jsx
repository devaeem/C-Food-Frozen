"use client";
import React, { useState } from "react";
import AdminLayout from "../../components/admin/adminLayout";
import { useQuery, useMutation } from "@tanstack/react-query";
import Alert from "@mui/material/Alert";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { getCategories, createCategories } from "../../../func/api";
import DialogDel from "../../components/admin/category/dialogDel";
import DialogEdit from "../../components/admin/category/dialogEdit";

const Page = () => {
  const [categoryName, setCategoryName] = useState("");
  const [data, setData] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [isOpenDialogDel, setIsOpenDialogDel] = useState(false);
  const [isOpenDialogEdit, setIsOpenDialogEdit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [editId, setEditId] = useState("");
  const [successEdit, setSuccessEdit] = useState(false);

  const {
    isPending,
    error,
    data: listData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["list-data-category", { search, page, pageSize }],
    queryFn: async () => {
      try {
        const res = await getCategories(search, page, pageSize);
        setTotalPages(res.data.totalPages);
        return res.data.category;
      } catch (err) {

        throw err;
      }
    },
  });

  const createCategory = useMutation({
    mutationFn: async (payload) => {
      return await createCategories(payload);
    },
    onSuccess: (res) => {
      refetch();
      setCategoryName("");
      setData(true);
    },
    onError: (err) => {
        throw err;

    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: categoryName,
    };

    createCategory.mutate(payload);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleClickOpenDel = (id) => {
    setIsOpenDialogDel(true);
    setEditId(id);
  };

  const handleClickOpenEdit = (id) => {
    setIsOpenDialogEdit(true);
    setEditId(id);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col items-start justify-start">
        <h1 className="text-4xl font-extrabold ">หมวดหมู่สินค้า </h1>
        {data && (
          <div className="mt-2 p-2 rounded-md">
            <Alert severity="success">
              {" "}
              บันทึกหมวดหมู่สินค้าสำเร็จ: {categoryName}.
              <IconButton onClick={() => setData(false)}>
                <ClearIcon />
              </IconButton>
            </Alert>
          </div>
        )}

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

        {successEdit && (
          <div className="mt-2 p-2 rounded-md">
            <Alert severity="success">
              {" "}
              อัพเดพหมวดหมู่สินค้าสำเร็จ:
              <IconButton onClick={() => setSuccessEdit(false)}>
                <ClearIcon />
              </IconButton>
            </Alert>
          </div>
        )}

        <div className="flex-1 ">
          <form onSubmit={handleSubmit} className="mt-4">
            <label
              htmlFor="categoryName"
              className="block text-lg font-medium text-gray-700"
            >
              ชื่อหมวดหมู่:
            </label>
            <input
              type="text"
              id="categoryName"
              onChange={(e) => setCategoryName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
              required
              placeholder="ชื่อหมวดหมู่สินค้า"
              value={categoryName}
            />
            <button
              type="submit"
              className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              บันทึก
            </button>
          </form>
        </div>

        <span className="text-red-600 mt-5">
          * หากลบหมวดหมู่ ถ้ามีการเลือกสินค้าจะไม่สามารถลบหมวดหมู่ได้
        </span>

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
        {listData?.length === 0 ? (
          <div className="mt-4 p-2 rounded-md">
            <Alert severity="info">ไม่พบข้อมูลหมวดหมู่สินค้า</Alert>
          </div>
        ) : (
          <div className="flex-1 mt-8 w-full">
            <h1 className="text-xl font-extrabold">รายการหมวดหมู่</h1>
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
                      ชื่อหมวดหมู่
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      การจัดการ
                    </th>
                  </tr>
                </thead>
                {listData?.map((category, index) => (
                  <>
                    <tbody className="bg-white divide-y divide-gray-200  ">
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {category.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium ">
                          <div className="flex items-center justify-start gap-2">
                            <Button
                              variant="contained"
                              startIcon={<CreateIcon />}
                              onClick={() => handleClickOpenEdit(category.id)}
                            >
                              แก้ไข
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={<DeleteIcon />}
                              onClick={() => handleClickOpenDel(category.id)}
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
      {isOpenDialogDel && (
        <DialogDel
          handleClose={() => {
            setIsOpenDialogDel(false);
          }}
          editId={editId}
          setSuccess={setSuccess}
          refetch={refetch}
        />
      )}

      {isOpenDialogEdit && (
        <DialogEdit
          handleClose={() => {
            setIsOpenDialogEdit(false);
          }}
          editId={editId}
          refetch={refetch}
          setSuccessEdit={setSuccessEdit}
        />
      )}

      <div className="flex mt-9 items-center justify-center">
        <Pagination
          count={totalPages}
          color="primary"
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </AdminLayout>
  );
};

export default Page;
