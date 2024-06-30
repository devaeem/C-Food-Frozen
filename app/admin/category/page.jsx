"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/adminLayout";
import Alert from "@mui/material/Alert";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getCategories,
  createCategories,
  getCategoriesId,
  delCategoriesId,
} from "../../../func/api";
import DialogDel from "../../components/admin/category/dialogDel";
import DialogEdit from "../../components/admin/category/dialogEdit";

const Page = () => {
  const [categoryName, setCategoryName] = useState("");
  const [data, setData] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [isOpenDialogDel, setIsOpenDialogDel] = useState(false);
  const [isOpenDialogEdit, setIsOpenDialogEdit] = useState(false);
  const [categoryData, setCategoryData] = useState({});
  const [success, setSuccess] = useState(false);
  const [editId, setEditId] = useState("");
  const [successEdit, setSuccessEdit] = useState(false);

  useEffect(() => {
    LoadData(search, page, pageSize);
  }, [search, page, pageSize]);
  const LoadData = (search, page, pageSize) => {
    getCategories(search, page, pageSize)
      .then((res) => {
        setCategoryList(res.data.category);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: categoryName,
    };

    createCategories(payload)
      .then((res) => {

        LoadData();
      })
      .catch((err) => {
        console.log(err);
      });

    // setCategoryName("");
    setData(true);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleClickOpenDel = (id) => {
    setIsOpenDialogDel(true);
    getDataId(id);
  };

  const handleClickOpenEdit = (id) => {
    setIsOpenDialogEdit(true);
    setEditId(id);

  };

  const handleDelCategory = (id) => {
    delCategoriesId(id)
      .then((res) => {
        setIsOpenDialogDel(false);
        LoadData();
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataId = (id) => {
    getCategoriesId(id)
      .then((res) => {
        setCategoryData(res.data.category);
      })
      .catch((err) => {
        console.log(err);
        setIsOpenDialogDel(false);
      });
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
        {categoryList.length === 0 ? (
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
                {categoryList.map((category, index) => (
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
                              onClick={() => handleClickOpenEdit(category._id)}
                            >
                              แก้ไข
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={<DeleteIcon />}
                              onClick={() => handleClickOpenDel(category._id)}
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
          categoryData={categoryData}
          handleDelCategory={handleDelCategory}
        />
      )}

      {isOpenDialogEdit && (
        <DialogEdit
          handleClose={() => {
            setIsOpenDialogEdit(false);
          }}
          editId={editId}
          setSuccessEdit={setSuccessEdit}
          LoadData={LoadData}
          // handleDelCategory={handleDelCategory}
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
