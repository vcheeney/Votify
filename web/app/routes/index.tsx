import { Box, Button, Typography } from "@mui/material";
import { Link } from "remix";

export default function Index() {
  return (
    <Box>
      <Typography variant="h1">Welcome to Votify</Typography>
      <Typography variant="subtitle2">
        This is our beautiful landing page.
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/connect"
        sx={{
          mt: 4,
        }}
      >
        Get started
      </Button>
    </Box>
  );
}
