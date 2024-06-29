"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Skeleton from "@mui/material/Skeleton";
import { getCategoriesId, updateCategoriesId } from "../../../../func/api";
const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DialogEdit = ({ handleClose, editId,setSuccessEdit,LoadData }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    resData();
  }, []);

  const [data, setData] = useState([]);

  const resData = () => {
    getCategoriesId(editId)
      .then((res) => {
        if (res.data.category) {
          setLoading(false);
          setData(res.data.category);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleUpdate = () => {
    const payload ={
      name: data.name,
    }
    updateCategoriesId(editId, payload)
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
    <>
      <CustomDialog
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="customized-dialog-title"
        open
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          แก้ไขหมวดหมู่สินค้า:{editId}
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
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="email"
                  label="ชื่อหมวดหมู่สินค้า"
                  type="text"
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  defaultValue={data.name}
                  fullWidth
                  variant="standard"
                />
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
    </>
  );
};

export default DialogEdit;
