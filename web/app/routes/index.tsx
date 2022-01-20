import { Box, Button, Typography } from "@mui/material";
import { Link } from "remix";

export default function Index() {
  return (
    <Box>
      <Typography variant="h1">Welcome to Votify</Typography>
      <Typography variant="h2">Landing Page</Typography>
      <Button
        variant="contained"
        component={Link}
        to="/vote"
        sx={{
          mt: 4,
        }}
      >
        Vote now
      </Button>
    </Box>
  );
}
