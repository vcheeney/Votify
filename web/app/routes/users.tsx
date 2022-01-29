import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ActionFunction, Form, useLoaderData } from "remix";
import { createUser, getUsers } from "../lib/users";

export const loader = async () => {
  return await getUsers();
};

// https://remix.run/docs/en/v1/guides/data-writes
export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();

  try {
    const id = parseInt(body.get("user_id")?.toString() || "");
    if (id) {
      const user = await createUser(id);
      return { values: { user: user } };
    }
  } catch (error) {
    return { errors: { user_id: "User ID has to be a number" } };
  }
};

export default function Users() {
  const users = useLoaderData();

  return (
    <Box>
      <Typography variant="h1">Welcome to Votify</Typography>
      <Typography variant="h2">This is a test page :)</Typography>
      <Form method="post">
        <Stack sx={{ mt: 4 }}>
          <TextField
            id="user_id"
            name="user_id"
            label="User ID"
            variant="outlined"
            size="small"
            type="number"
          />
          <Button
            variant="contained"
            sx={{
              mt: 4,
            }}
            type="submit"
          >
            Insert a new user
          </Button>
        </Stack>
      </Form>
      <Typography variant="h2" sx={{ mt: 4 }}>
        Users:
      </Typography>
      <List>
        {users &&
          users.map((user: { id: string }) => (
            <ListItem>
              <ListItemText primary={user.id} />;
            </ListItem>
          ))}
      </List>
    </Box>
  );
}
