"use client";
import React, { useState, useEffect } from "react";
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
const DialogProduct = ({ handleClose, setSuccess, loadData }) => {
  const [categoryList, setCategoryList] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  // const CustomDialog = styled(Dialog)(({ theme }) => ({
  //   "& .MuiDialogContent-root": {
  //     padding: theme.spacing(2),
  //   },
  //   "& .MuiDialogActions-root": {
  //     padding: theme.spacing(1),
  //   },
  // }));
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

  const handleChangeImage = (event) => {
    const files = Array.from(event.target.files);
    const base64Images = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        base64Images.push(reader.result);
        if (base64Images.length === files.length) {
          setImages((prevImages) => [...prevImages, ...base64Images]);
        }
      };
      reader.onerror = (error) => console.error("Error reading file:", error);
    });
  };

  const handleAddProduct = () => {
    const payload = {
      name: name,
      categoryId: categoryRef,
      price: Number(price),
      desc: description,
      Image: images,
    };

    createProduct(payload)
      .then((res) => {
        setSuccess(true);
        loadData();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
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
                options={categoryList || []}
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
