"use client";
import React, { useState, useEffect } from "react";
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
const DialogEdit = ({ handleClose, editId, setSuccessEdit, LoadData }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
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
    fatchData(search, page, pageSize);
    resData();
  }, [search, page, pageSize]);

  const fatchData = (search, page, pageSize) => {
    getCategories(search, page, pageSize)
      .then((res) => {
        setCategoryList(res.data.category);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resData = () => {
    getProductId(editId)
      .then((res) => {
        if (res.data.product) {
          setLoading(false);
          setData(res.data.product);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [name, setName] = useState("");
  const [categoryRef, setCategoryRef] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageBase64, setImageBase64] = useState([]);

  const handleChangeImage = (event) => {
    const files = Array.from(event.target.files);
    const base64Images = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        base64Images.push(reader.result);
        // Update state only after all files are read
        if (base64Images.length === files.length) {
          setImageBase64((prevImages) => [...prevImages, ...base64Images]);
        }
      };
      reader.onerror = (error) => console.error("Error reading file:", error);
    });
  };
  const handleUpdate = () => {
    const payload = {
      name: data.name,
      categoryRef: categoryRef || data.categoryRef._id,
      price: data.price,
      desc: data.desc,
      image: imageBase64 || data.image,
    };

    updateProductId(editId, payload)
      .then((res) => {
        if (res.data) {
          handleClose();
          LoadData();
          setSuccessEdit(true);
        }
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
          แก้ไขสินค้า:{editId}
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
                  name="name55"
                  label="ชื่อสินค้า"
                  type="text"
                  fullWidth
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  defaultValue={data.name}
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
                  value={data.categoryRef}
                  onChange={(event, newValue) => {
                    console.log("newValue", newValue);
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
                  defaultValue={data.price}
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
                  onChange={(e) => setData({ ...data, desc: e.target.value })}
                  defaultValue={data.desc}
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
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {/* Render images with delete button */}
                  {(imageBase64 && imageBase64.length > 0
                    ? imageBase64
                    : data.image
                  ).map((imgSrc, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative",

                      }}
                    >
                      <img
                        src={imgSrc}
                        alt={`Image ${index}`}
                        style={{ objectFit: 'fill', width: '128px', height: '118px' }}
                      />
                      <IconButton
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                        }}
                        // onClick={() => handleDeleteImage(index)}
                      >
                        <DeleteIcon className="text-red-500" />
                      </IconButton>
                      <span>{index === 0 ? 'รูปหลัก' : null}</span>

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
