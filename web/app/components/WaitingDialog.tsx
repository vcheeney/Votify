import {
  LinearProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { FC, useEffect } from "react";
import { useNavigate } from "remix";

type Props = {
  open: boolean;
  title: string;
  message: string;
  route: string;
  ready: boolean;
};

export const WaitingDialog: FC<Props> = ({
  open,
  title,
  message,
  route,
  ready,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (ready) {
      navigate(route);
    }
  }, [ready]);

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
        <LinearProgress sx={{ height: 8, mt: 4 }} />
      </DialogContent>
    </Dialog>
  );
};
