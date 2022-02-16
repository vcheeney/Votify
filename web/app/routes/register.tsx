import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Grid,
  Stack,
  TextField,
  Typography,
  FormHelperText,
  Alert,
} from "@mui/material";
import { ActionFunction, Form, useTransition, useActionData } from "remix";
import invariant from "tiny-invariant";
import { FullPageSpinner } from "~/components/FullPageSpinner";
import { WaitingDialog } from "~/components/WaitingDialog";
import { useEthereum } from "~/context/EthereumContext";
import { giveRightToVote } from "~/lib/ballot";
import { CustomError } from "~/lib/error";
import { useVoterStatus } from "~/lib/other";
import { registerUser } from "../lib/users.server";

// TODO: add fancy error messages
// https://remix.run/docs/en/v1/guides/data-writes#animating-in-the-validation-errors
export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();

  const account = body.get("account");
  const secretCode = body.get("secretCode");
  const dateOfBirth = body.get("dateOfBirth");

  invariant(account, "Account is required");
  invariant(typeof account === "string", "Account must be a string");

  invariant(secretCode, "Secret code is required");
  invariant(typeof secretCode === "string", "Secret code must be a string");

  invariant(dateOfBirth, "Date of birth is required");
  invariant(typeof dateOfBirth === "string", "Date of birth must be a string");

  console.log(account, secretCode, dateOfBirth);

  const user = await registerUser(secretCode, new Date(dateOfBirth), account);

  const success = await giveRightToVote(account);

  if (success) {
    return true;
  } else {
    throw new CustomError(
      "Could not give right to vote (See error in the server console)"
    );
  }

  return null;
};

export default function Register() {
  const status = useVoterStatus();
  const { account } = useEthereum();
  const transition = useTransition();
  const registered = useActionData();

  if (status === "loading") {
    return <FullPageSpinner />;
  }

  if (status === "registered") {
    window.location.replace("/vote");
  }

  if (status === "voted") {
    window.location.replace("/results");
  }

  return (
    <Box>
      <WaitingDialog
        ready={false}
        title="Your registration has been accepted"
        route="/vote"
        open={registered}
        message="We are currently waiting for the operation to be saved on the public ledger. You will be redirected to the voting page once the process is complete. It should only take a few seconds."
      />
      <Typography variant="h1">Register</Typography>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Form method="post">
          <Stack sx={{ mt: 4 }} spacing={3}>
            <Typography variant="h2">Register your account</Typography>
            <Alert severity="warning">
              Make sure you are linking the right account. Your secret codes can
              only be used once
            </Alert>
            <Typography align="center">
              Linking account: <b>{account}</b>
            </Typography>
            <FormControl>
              <TextField
                id="secretCode"
                name="secretCode"
                variant="outlined"
                label="Secret Code"
              />
            </FormControl>
            <FormControl>
              <TextField
                id="dateOfBirth"
                name="dateOfBirth"
                label="Date of Birth"
                type="date"
                defaultValue="1980-01-01"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormHelperText>To verify your identity</FormHelperText>
            </FormControl>
            <input name="account" type="hidden" value={account as string} />
            <Button variant="contained" type="submit">
              {transition.state === "submitting"
                ? "Registering..."
                : "Register"}
            </Button>
          </Stack>
        </Form>
      </Grid>
    </Box>
  );
}
