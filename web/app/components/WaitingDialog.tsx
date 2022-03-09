import {
  LinearProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { FC } from "react";

type Props = {
  open: boolean;
  title: string;
  message: string;
};

export const WaitingDialog: FC<Props> = ({ open, title, message }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
        <LinearProgress sx={{ height: 8, mt: 4, borderRadius: 5 }} />
      </DialogContent>
    </Dialog>
  );
};
