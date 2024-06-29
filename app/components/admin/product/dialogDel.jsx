"use client";
import React from 'react'
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const DialogDel = ({handleClose,productData,handleDelProduct}) => {
  return (
    <>
     <Dialog
        open
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {productData._id}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
         ลบสินค้า {productData.name} นี้หรือไม่?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button onClick={() => handleDelProduct(productData._id)} >
            ลบสินค้า
          </Button>
        </DialogActions>
      </Dialog>

    </>
  )
}

export default DialogDel