import { Box, Button, List, ListItemText, Typography } from "@mui/material";
import { useLoaderData } from "remix";
import { getUsers } from "../lib/users";

export const loader = async () => {
  return await getUsers();
};

export default function Users() {
  const users = useLoaderData();

  return (
    <Box>
      <Typography variant="h1">Welcome to Votify</Typography>
      <Typography variant="h2">This is a test page :)</Typography>
      <Button
        variant="contained"
        sx={{
          mt: 4,
        }}
      >
        Insert a new user
      </Button>
      <Typography variant="h2" sx={{ mt: 4 }}>
        Users:
      </Typography>
      <List>
        {users ??
          users.map((user: string) => {
            <ListItemText primary={user} />;
          })}
      </List>
    </Box>
  );
}
