"use client";
import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/adminLayout";
import { useQuery, useMutation } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import Pagination from "@mui/material/Pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Image from "next/image";
import Input from "@mui/material/Input";

import {
  getBanner,
  createBanner,
} from "../../../func/banner";
import DialogDel from "../../components/admin/banner/dialogDel";
import DialogEdit from "../../components/admin/banner/dialogEdit";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"
const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [image64, setImage64] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [isOpenDialogDel, setIsOpenDialogDel] = useState(false);
  const [success, setSuccess] = useState(false);
  const [editId, setEditId] = useState("");
  const [successEdit, setSuccessEdit] = useState(false);
  const [isOpenDialogEdit, setIsOpenDialogEdit] = useState(false);


  const token = session?.user?.accessToken;
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);



  const {
    isPending,
    error,
    data: listDataBanner,
    refetch,
  } = useQuery({
    queryKey: ["list-data-banner", { search, page, pageSize }],
    queryFn: async () => {
      try {
        const res = await getBanner(search, page, pageSize);
        return res.data.banner;
      } catch (err) {

        throw err;
      }
    },
  });

  const createBanners = useMutation({
    mutationFn: async ({token,payload}) => {
      return await createBanner({token,payload});
    },
    onSuccess: (res) => {
      refetch();
      setImage64("");
      setCreateData(true);
    },
    onError: (err) => {
      throw err;

    },
  });

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      images: image64,
    };
    createBanners.mutate({token,payload});
  };

  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const img = new window.Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let width = 1599;
        let height = 488;

        canvas.width = 1599;
        canvas.height = 488;

        ctx.drawImage(img, 0, 0, width, height);

        const resizedDataURL = canvas.toDataURL(file.type);
        setImage64(resizedDataURL);
      };
    };

    if (file) {
      reader.readAsDataURL(file);
    }
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
    <>
      <AdminLayout>
        <div className="flex flex-col items-start justify-start gap-3">
          <h1 className="text-4xl font-extrabold ">ตั่งค่าระบบ</h1>

          <div className="flex-1 ">
            <form onSubmit={handleSubmit} className="mt-4">
              <label
                htmlFor="categoryName"
                className="block text-lg font-medium text-gray-700"
              >
                banner:
              </label>
              <Input
                required
                margin="dense"
                id="image"
                name="image67"
                label="รูปภาพสินค้า"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                type="file"
                fullWidth
                inputProps={{ accept: "image/*" }}
                onChange={handleChangeImage}
                variant="standard"
              />

              <button
                type="submit"
                className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                เพื่มภาพ banner
              </button>

              {image64 && (
                <Image
                  src={image64}
                  width={300}
                  height={300}
                  className="mt-4"
                  alt="Picture of the author"
                  style={{ objectFit: "contain" }}
                />
              )}
            </form>
          </div>

          {successEdit && (
            <div className="mt-2 p-2 rounded-md">
              <Alert severity="success">
                {" "}
                อัพเดพ Banner สำเร็จ
                <IconButton onClick={() => setSuccessEdit(false)}>
                  <ClearIcon />
                </IconButton>
              </Alert>
            </div>
          )}

          {success && (
            <div className="mt-2 p-2 rounded-md">
              <Alert severity="success">
                {" "}
                ลบ Banner สำเร็จ
                <IconButton onClick={() => setSuccess(false)}>
                  <ClearIcon />
                </IconButton>
              </Alert>
            </div>
          )}

          <div className="flex-1 mt-8 w-full">
            <h1 className="text-xl font-extrabold">ภาพ แบนนเนอร์</h1>
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
                      ภาพเบนเนอร์
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      การจัดการ
                    </th>
                  </tr>
                </thead>
                {listDataBanner?.map((banner, index) => (
                  <>
                    <tbody className="bg-white divide-y divide-gray-200  ">
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {banner.images ? (
                            <Image
                              src={banner.images}
                              width={120}
                              height={120}
                              alt="Picture of the author"
                              style={{ objectFit: "contain" }}
                            />
                          ) : (
                            "ไม่มีรูปภาพ"
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium ">
                          <div className="flex items-center justify-start gap-2">
                            <Button
                              variant="contained"
                              startIcon={<CreateIcon />}
                              onClick={() => handleClickOpenEdit(banner.id)}
                            >
                              แก้ไข
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={<DeleteIcon />}
                              onClick={() => handleClickOpenDel(banner.id)}
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
        </div>

        <div className="flex mt-9 items-center justify-center">
          <Pagination
            count={totalPages}
            color="primary"
            page={page}
            onChange={handlePageChange}
          />
        </div>
      </AdminLayout>

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
          token={token}
        />
      )}
    </>
  );
};

export default Page;
