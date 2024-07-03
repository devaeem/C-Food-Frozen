"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Skeleton from "@mui/material/Skeleton";
import { getBannerId, updateBannerId } from "../../../../func/banner";
import Image from "next/image";
import Input from "@mui/material/Input";

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DialogEdit = ({ handleClose, editId, setSuccessEdit, LoadData }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [imageBase64, setImageBase64] = useState("");

  useEffect(() => {
    resData();
  }, []);

  const resData = () => {
    getBannerId(editId)
      .then((res) => {
        if (res.data.banner) {
          setLoading(false);
          setData(res.data.banner);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageBase64(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    const payload = {
      images: imageBase64 || data.images,
    };

    updateBannerId(editId, payload)
      .then((res) => {
        if (res.data) {
          LoadData();
          setSuccessEdit(true);
          handleClose();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CustomDialog
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      aria-labelledby="customized-dialog-title"
      open
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        แก้ไข Banner: {editId}
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
            <Grid item xs={12}>
              <form className="mt-4">
                <label
                  htmlFor="categoryName"
                  className="block text-lg font-medium text-gray-700"
                >
                  banner:
                </label>
                <Input
                  required
                  margin="dense"
                  id="imaged"
                  name="imaged"
                  label="รูปภาพสินค้า"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                  type="file"
                  fullWidth
                  inputProps={{ accept: "image/*" }}
                  onChange={handleChangeImage}
                  variant="standard"
                />
              </form>
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                {!imageBase64 && data.image && (
                  <Image
                    src={data.image}
                    width={300}
                    height={300}
                    alt="Current Banner Image"
                    style={{ objectFit: "contain" }}
                  />
                )}

                {imageBase64 && (
                  <Image
                    src={imageBase64}
                    width={300}
                    height={300}
                    alt="Updated Banner Image"
                    style={{ objectFit: "contain" }}
                  />
                )}
              </div>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleUpdate}>
          บันทึกสินค้า
        </Button>
      </DialogActions>
    </CustomDialog>
  );
};

export default DialogEdit;
