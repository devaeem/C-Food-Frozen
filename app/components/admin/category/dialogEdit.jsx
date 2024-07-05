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
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCategoriesId, updateCategoriesId } from "../../../../func/api";
const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DialogEdit = ({ handleClose, editId, setSuccessEdit, refetch }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const {
    isPending,
    error,
    data: listGetData,
  } = useQuery({
    queryKey: ["list-get-category", { editId }],
    queryFn: async () => {
      try {
        const res = await getCategoriesId(editId);
        setLoading(false);
        setData(res.data.category);
        return res.data.category;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  });

  const updateCategory = useMutation({
    mutationFn: async (payload) => {
      return await updateCategoriesId(editId, payload);
    },
    onSuccess: (res) => {
      refetch();
      setSuccessEdit(true);
      handleClose();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleUpdate = () => {
    const payload = {
      name: data.name,
    };
    updateCategory.mutate(payload);
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
          แก้ไขหมวดหมู่สินค้า:{listGetData?.id}
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
                  defaultValue={listGetData?.name}
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
