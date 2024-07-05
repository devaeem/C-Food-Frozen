"use client";
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete";
import CloseIcon from "@mui/icons-material/Close";
import Input from "@mui/material/Input";
import Badge from "@mui/material/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import { getCategories } from "../../../../func/api";
import { getProductId, updateProductId } from "../../../../func/productapi";
import Skeleton from "@mui/material/Skeleton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const DialogEdit = ({
  handleClose,
  editId,
  setSuccessEdit,
  refetch,
  token,
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const { data: listCategory } = useQuery({
    queryKey: ["list-category-edit-product", { search, page, pageSize }],
    queryFn: async () => {
      try {
        const res = await getCategories(search, page, pageSize);

        return res.data.category;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  });

  const { data: listProductGetData } = useQuery({
    queryKey: ["list-get-productId", { editId }],
    queryFn: async () => {
      try {
        const res = await getProductId(editId);
        setLoading(false);
        setData(res.data.product)
        return res.data.product;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  });

  const [name, setName] = useState("");
  const [categoryRef, setCategoryRef] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageBase64, setImageBase64] = useState([]);

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          let width = 500;
          let height = 500;

          canvas.width = 500;
          canvas.height = 500;

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            resolve(blob);
          }, file.type);
        };
      };
    });
  };

  const handleChangeImage = async (event) => {
    const files = Array.from(event.target.files);
    const resizedImages = [];

    for (const file of files) {
      const resizedBlob = await resizeImage(file, 800, 800); // Adjust maxWidth and maxHeight as needed
      const resizedDataURL = URL.createObjectURL(resizedBlob);
      resizedImages.push(resizedDataURL);
    }

    setImageBase64((prevImages) => [...prevImages, ...resizedImages]);
  };

  const updateProduct = useMutation({
    mutationFn: async ({ token, editId, payload }) => {
      return await updateProductId({ token, editId, payload });
    },
    onSuccess: (res) => {
      refetch();
      setSuccessEdit(true);
      handleClose();
    },
    onError: (err) => {
      console.log(err);
      handleClose();
    },
  });

  const handleUpdate = () => {
    const payload = {
      name: data.name,
      categoryId: categoryRef || listProductGetData.Category.id,
      price: Number(data.price),
      desc: data.description,
      Image: imageBase64 || listProductGetData.images,
    };

    updateProduct.mutate({token,editId,payload});
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="customized-dialog-title"
        open
        style={{ padding: 4 }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          แก้ไขสินค้า:{listProductGetData?.id}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 0,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {loading ? (
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  margin="dense"
                  id="name"
                  name="name"
                  label="ชื่อสินค้า"
                  type="text"
                  fullWidth
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  defaultValue={data?.name}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  disablePortal
                  required
                  id="combo-box-demo"
                  options={listCategory || []}
                  fullWidth
                  freeSolo
                  value={listProductGetData?.Category}
                  onChange={(event, newValue) => {
                    setCategoryRef(newValue?._id || "");
                  }}
                  getOptionLabel={(option) => option.name || ""}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="หมวดหมู่สินค้า"
                      variant="standard"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  margin="dense"
                  id="price"
                  name="price"
                  label="ราคาสินค้า"
                  type="number"
                  fullWidth
                  onChange={(e) => setData({ ...data, price: e.target.value })}
                  defaultValue={listProductGetData?.price}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  margin="dense"
                  id="description"
                  name="description"
                  label="รายละเอียดสินค้า"
                  type="text"
                  fullWidth
                  onChange={(e) =>
                    setData({ ...data, desc: e.target.value })
                  }
                  defaultValue={listProductGetData?.desc}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  required
                  margin="dense"
                  id="image"
                  name="image"
                  label="รูปภาพสินค้า"
                  type="file"
                  fullWidth
                  inputProps={{ accept: "image/*", multiple: true }}
                  onChange={handleChangeImage}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                {/* {data?.images?.map((item)=> (
                    <>
                    <h1>{item.id}</h1>
                    </>
                  )) } */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {(imageBase64 && imageBase64.length > 0
                    ? imageBase64
                    : listProductGetData?.images
                  ).map((imgSrc, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                      }}
                    >
                      {imgSrc.url && (
                        <img
                          src={imgSrc.url}
                          alt={`Image ${index}`}
                          style={{
                            objectFit: "fill",
                            width: "128px",
                            height: "118px",
                          }}
                        />
                      )}
                      {imgSrc && !imgSrc.url && (
                        <img
                          src={imgSrc}
                          alt={`Image ${index}`}
                          style={{
                            objectFit: "fill",
                            width: "128px",
                            height: "118px",
                          }}
                        />
                      )}

                      <IconButton
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                        }}
                        // Uncomment the next line to enable the delete functionality
                        // onClick={() => handleDeleteImage(index)}
                      >
                        <DeleteIcon className="text-red-500" />
                      </IconButton>
                      {index === 0 && <span>รูปหลัก</span>}
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleUpdate}
            startIcon={<AddIcon />}
          >
            อัพเดทสินค้า
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogEdit;
