import { Box, Button, Typography } from "@mui/material";
import { Link } from "remix";
import { ArrowBack } from "@mui/icons-material";

export default function Index() {
  return (
    <Box>
      <Typography variant="h1">Vote</Typography>
      <Typography>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque magni
        excepturi animi culpa perspiciatis neque odit dicta nesciunt voluptates
        sunt fugiat hic molestiae voluptate qui ipsa voluptatum quibusdam a cum,
        placeat tempore corrupti tempora facilis laudantium vitae? Vitae debitis
        eligendi accusantium nam commodi ullam quibusdam, cum optio voluptatum
        illum excepturi suscipit cumque consequatur necessitatibus. Est quis
        eaque quibusdam asperiores impedit! Ad voluptatem, totam tempora
        voluptatibus, magnam dolore quasi, quaerat eaque vero distinctio sit
        quos magni!
      </Typography>
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
