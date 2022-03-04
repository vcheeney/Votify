import {
  Box,
  Button,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
  FormHelperText,
  Alert,
} from "@mui/material";
import {
  ActionFunction,
  Form,
  useTransition,
  useActionData,
  useSubmit,
  SubmitFunction,
  useNavigate,
} from "remix";
import invariant from "tiny-invariant";
import { FullPageSpinner } from "~/components/FullPageSpinner";
import { WaitingDialog } from "~/components/WaitingDialog";
import { useEthereum } from "~/context/EthereumContext";
import { giveRightToVote } from "~/lib/ballot";
import { CustomError } from "~/lib/error";
import { useVoterStatus } from "~/hooks/useVoterStatus";
import { registerUser } from "../lib/users.server";
import { useVoter } from "../context/VoterContext";
import { useEffect, useState } from "react";

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

  const user = await registerUser(secretCode, new Date(dateOfBirth), account);

  const success = await giveRightToVote(account);

  if (success) {
    return true;
  } else {
    throw new CustomError(
      "Could not give right to vote (See error in the server console)"
    );
  }
};

export default function Register() {
  const status = useVoterStatus();
  const { account } = useEthereum();
  const transition = useTransition();
  const registered = useActionData();
  const submit = useSubmit();
  const { verifyWallet } = useVoter();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "registered") {
      navigate("/vote");
    }

    if (status === "voted") {
      navigate("/results");
    }
  }, [status]);

  async function handleSubmit(target: Parameters<SubmitFunction>[0]) {
    const verified = await verifyWallet();

    if (!verified) {
      // TODO: show error message
      return;
    }

    submit(target);
  }

  function handleChange(e: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    const code = formData.get("secretCode");
    const dateOfBirth = formData.get("dateOfBirth");

    setSubmitDisabled(
      transition.state === "submitting" ||
        code == null ||
        code === "" ||
        dateOfBirth == null ||
        dateOfBirth === ""
    );
  }

  if (status === "loading") {
    return <FullPageSpinner />;
  }

  return (
    <Box>
      <WaitingDialog
        ready={false}
        title="Your registration has been accepted"
        route="/vote"
        open={!!registered}
        message="We are currently waiting for the operation to be saved on the public ledger. You will be redirected to the voting page once the process is complete. It should only take a few seconds."
      />
      <Typography variant="h1">Register</Typography>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Form
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e.currentTarget);
          }}
          onChange={handleChange}
        >
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
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormHelperText>To verify your identity</FormHelperText>
            </FormControl>
            <input name="account" type="hidden" value={account as string} />
            <Button variant="contained" type="submit" disabled={submitDisabled}>
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
