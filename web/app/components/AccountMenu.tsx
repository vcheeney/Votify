import { LinkOff } from "@mui/icons-material";
import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import { useEthereum } from "~/context/EthereumContext";
import { useVoter } from "~/context/VoterContext";
import { formatAccountString } from "~/lib/utils";

export const AccountMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { account, logoutEthereumAccount, loading } = useEthereum();
  const { voter } = useVoter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="account-menu"
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="neutral"
      >
        <Stack direction="row" spacing={1}>
          <Typography>
            {voter && account ? `${voter.firstName} ${voter.lastName}` :  null}
          </Typography>
          <Box
            component="img"
            src="/metamask-fox.svg"
            sx={{
              width: 22,
            }}
          />
          <Typography
            sx={{
              fontWeight: "bold",
              minWidth: 120,
              display: "inline-block",
              textAlign: "left",
            }}
          >
            {loading
              ? "loading..."
              : (account && formatAccountString(account)) || "not connected"}
          </Typography>
        </Stack>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          marginTop: 1,
        }}
      >
        <MenuItem
          onClick={() => {
            logoutEthereumAccount();
            handleClose();
          }}
        >
          <ListItemIcon>
            <LinkOff />
          </ListItemIcon>
          <ListItemText>Disconnect</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
