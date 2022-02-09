import { Box, Button, Stack, Typography } from "@mui/material";
import { ActionFunction, Form, redirect, useActionData } from "remix";
import invariant from "tiny-invariant";
import FullPageSpinner from "~/components/FullPageSpinner";
import { useEthereum } from "~/ctx/ethereum";
import { giveRightToVote } from "~/lib/ballot";
import { CustomError } from "~/lib/error";
import { useVoterStatus } from "~/lib/other";

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();

  const account = body.get("account");

  invariant(account, "Account is required");
  invariant(typeof account === "string", "Account must be a string");

  const success = await giveRightToVote(account);

  if (success) {
    return redirect("/vote");
  } else {
    throw new CustomError(
      "Could not give right to vote (See error in the server console)"
    );
  }
};

export default function Register() {
  const status = useVoterStatus();
  const { account } = useEthereum();

  if (status === "loading") {
    return <FullPageSpinner />;
  }

  if (status === "registered") {
    window.location.replace("/vote");
  }

  return (
    <Box>
      <Typography variant="h1">Register</Typography>
      <Form method="post">
        <Stack sx={{ mt: 4 }}>
          <Typography variant="body1">
            Register the {account} account?
          </Typography>
          <input name="account" type="hidden" value={account as string} />
          <Button variant="contained" type="submit">
            Register
          </Button>
        </Stack>
      </Form>
    </Box>
  );
}
