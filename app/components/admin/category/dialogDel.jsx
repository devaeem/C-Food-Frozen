"use client";
import React from 'react'
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const DialogDel = ({handleClose,categoryData,handleDelCategory}) => {
  return (
    <>
     <Dialog
        open
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {categoryData._id}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
         ลบหมวดหมู่ {categoryData.name} นี้หรือไม่?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button onClick={() => handleDelCategory(categoryData._id)} >
            ลบหมวดหมู่
          </Button>
        </DialogActions>
      </Dialog>

    </>
  )
}

export default DialogDel