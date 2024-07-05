"use client";
import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import Image from "next/image";
import axios from "axios";
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
import { getCategories } from "../../../../func/api";
import { createProduct } from "../../../../func/productapi";
const DialogProduct = ({ handleClose, refetch, setSuccess }) => {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const {
    isPending,
    error,
    data: listCategory,
    isLoading,
  } = useQuery({
    queryKey: ["list-category", { search, page, pageSize }],
    queryFn: async () => {
      try {
        const res = await getCategories(search, page, pageSize);
        setTotalPages(res.data.totalPages);
        return res.data.category;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  });



  const [name, setName] = useState("");
  const [categoryRef, setCategoryRef] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [imageBase64, setImageBase64] = useState("");
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "categoryRef") setCategoryRef(value);
    if (name === "price") setPrice(value);
    if (name === "description") setDescription(value);
    if (name === "image") setImage(value);
  };

  const resizeImage = (file, maxWidth, maxHeight) => {
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

    setImages((prevImages) => [...prevImages, ...resizedImages]);
  };

  const createProducts = useMutation({
    mutationFn: async (payload) => {
      return await createProduct(payload);
    },
    onSuccess: (res) => {
      refetch();
      setSuccess(true);
      handleClose();
    },
    onError: (err) => {
      handleClose();
      console.log(err);
    },
  });

  const handleAddProduct = () => {
    const payload = {
      name: name,
      categoryId: categoryRef,
      price: Number(price),
      desc: description,
      Image: images,
    };
    createProducts.mutate(payload);


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
          เพิ่มสินค้า
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
                value={name}
                onChange={handleChange}
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
                onChange={(event, newValue) => {
                  setCategoryRef(newValue?.id || "");
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
                value={price}
                onChange={handleChange}
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
                value={description}
                onChange={handleChange}
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
              {images.length > 0 && (
                <div>
                  <h3>Uploaded Images:</h3>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                  >
                    {images.map((imageBase64, index) => (
                      <div
                        key={index}
                        style={{
                          position: "relative",
                          width: "145px",
                          height: "145px",
                        }}
                      >
                        <Image
                          src={imageBase64}
                          alt={`Uploaded image ${index + 1}`}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleAddProduct}
            startIcon={<AddIcon />}
          >
            เพื่มสินค้า
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogProduct;
