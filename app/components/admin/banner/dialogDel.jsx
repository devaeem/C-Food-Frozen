"use client";
import React from 'react'
import { useQuery,useMutation } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getBannerId,delBannerId } from "../../../../func/banner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"
const DialogDel = ({handleClose,refetch,editId,token}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const {
    isPending,
    error,
    data: listGetBannerDelData,
  } = useQuery({
    queryKey: ["list-get-del-banner", { editId }],
    queryFn: async () => {
      try {
        const res = await getBannerId(editId);
        return res.data.banner;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  });


  const delBanner = useMutation({
    mutationFn: async ({token,id}) => {
       return await delBannerId({token,id});
    },
    onSuccess: (res) => {
      refetch();
      setSuccess(true);
      handleClose();
    },
    onError: (err) => {
      console.log(err);
      handleClose();
    },
  });

  const handleDelBanner = (id) =>{
    delBanner.mutate({token,id});
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
          {listGetBannerDelData?.id}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
         ลบ Banner นี้หรือไม่?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button
          onClick={() => handleDelBanner(listGetBannerDelData?.id)}
          >
            ลบ Banner
          </Button>
        </DialogActions>
      </Dialog>

    </>
  )
}

export default DialogDel