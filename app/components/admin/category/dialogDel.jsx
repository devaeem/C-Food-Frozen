"use client";
import React from "react";
import { useQuery,useMutation } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getCategoriesId, delCategoriesId } from "../../../../func/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"
const DialogDel = ({ handleClose, editId, setSuccess,refetch,token }) => {
  const {
    isPending,
    error,
    data: listGetDelData,
  } = useQuery({
    queryKey: ["list-get-del-category", { editId }],
    queryFn: async () => {
      try {
        const res = await getCategoriesId(editId);
        return res.data.category;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  });

  const delCategory = useMutation({
    mutationFn: async ({token,id}) => {
       return await delCategoriesId({token,id});
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

  const handleDelCategory = (id) => {
    delCategory.mutate({token,id});
  };

  return (
    <>
      <Dialog
        open
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{listGetDelData?.id}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ลบหมวดหมู่ {listGetDelData?.name} นี้หรือไม่?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button onClick={() => handleDelCategory(listGetDelData?.id)}>
            ลบหมวดหมู่
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogDel;
