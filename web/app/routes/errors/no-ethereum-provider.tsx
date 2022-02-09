import { Box, Button, Typography } from "@mui/material";
import { Link } from "remix";

function NoEthereumProvider() {
  return (
    <Box>
      <Typography variant="h1">
        An ethereum provider is required to run this app (ex: MetaMask)
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/"
        replace={true}
        sx={{
          mt: 4,
        }}
      >
        Back to home
      </Button>
    </Box>
  );
}

export default NoEthereumProvider;
