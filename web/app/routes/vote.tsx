import { Box, Button, Typography } from "@mui/material";
import { Link } from "remix";
import { ArrowBack } from "@mui/icons-material";

export default function Index() {
  return (
    <Box>
      <Typography variant="h1">Vote</Typography>
      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBack />}
        sx={{
          mt: 4,
        }}
      >
        Go Back
      </Button>
    </Box>
  );
}
