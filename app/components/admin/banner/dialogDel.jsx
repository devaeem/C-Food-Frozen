"use client";
import React from 'react'
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const DialogDel = ({handleClose,bannerData,handleDelBanner}) => {
  return (
    <>
     <Dialog
        open
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {bannerData._id}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
         ลบ Banner นี้หรือไม่?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button
          onClick={() => handleDelBanner(bannerData.id)}
          >
            ลบ Banner
          </Button>
        </DialogActions>
      </Dialog>

    </>
  )
}

export default DialogDel