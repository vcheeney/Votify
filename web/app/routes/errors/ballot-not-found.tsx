import { Box, Button, Typography } from "@mui/material";
import { Link } from "remix";

function NoEthereumProvider() {
  return (
    <Box>
      <Typography variant="h1">
        The contract is not deployed on the selected network.
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
