"use client";
import React from 'react'
import { useQuery,useMutation } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getProductId,delProductId } from "../../../../func/productapi";
const DialogDel = ({handleClose, editId,refetch, setDel}) => {

  const {
    isPending,
    error,
    data: listGetProductDelData,
  } = useQuery({
    queryKey: ["list-get-del-product", { editId }],
    queryFn: async () => {
      try {
        const res = await getProductId(editId);
        return res.data.product;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  });

  const delProduct = useMutation({
    mutationFn: async (id) => {
       return await delProductId(id);
    },
    onSuccess: (res) => {
      refetch();
      setDel(true);
      handleClose();
    },
    onError: (err) => {
      console.log(err);
      handleClose();
    },
  });

  const handleDelProduct =(id)=>{
    delProduct.mutate(id);
  }

  return (
    <>
     <Dialog
        open
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {listGetProductDelData?.id}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
         ลบสินค้า {listGetProductDelData?.name} นี้หรือไม่?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button onClick={() => handleDelProduct(listGetProductDelData?.id)} >
            ลบสินค้า
          </Button>
        </DialogActions>
      </Dialog>

    </>
  )
}

export default DialogDel