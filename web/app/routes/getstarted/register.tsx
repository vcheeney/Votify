import {
  Box,
  Typography,
  Grid,
  Stack,
  Alert,
  FormControl,
  TextField,
  FormHelperText,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  ActionFunction,
  useTransition,
  useActionData,
  useSubmit,
  useNavigate,
  SubmitFunction,
  Form,
} from "remix";
import invariant from "tiny-invariant";
import { FullPageSpinner } from "~/components/FullPageSpinner";
import { WaitingDialog } from "~/components/WaitingDialog";
import { useEthereum } from "~/context/EthereumContext";
import { useVoter } from "~/context/VoterContext";
import { useVoterStatus } from "~/hooks/useVoterStatus";
import { giveRightToVote } from "~/lib/ballot";
import { CustomError } from "~/lib/error";
import { registerUser } from "~/lib/users.server";
import { usePageReady } from "~/hooks/usePageReady";
import { generalTransition, generalTransitionDelay } from "~/lib/transitions";

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

export default function GetStartedRegister() {
  const status = useVoterStatus();
  const { loading, account } = useEthereum();
  const transition = useTransition();
  const registered = useActionData();
  const submit = useSubmit();
  const { verifyWallet } = useVoter();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const navigate = useNavigate();
  const ready = usePageReady(!loading && status === "unregistered");

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!account) {
      navigate("/getstarted");
    }

    if (status === "registered") {
      navigate("/getstarted/vote");
    }

    if (status === "voted") {
      navigate("/results");
    }
  }, [loading, status]);

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
        title="Your registration has been accepted"
        open={!!registered}
        message="We are currently waiting for the operation to be saved on the public ledger. You will have access to the voting page as soon as the process is complete. It should only take a few seconds."
      />
      <Typography
        variant="pageTitle"
        sx={{
          ...generalTransition(ready),
        }}
      >
        Register your account
      </Typography>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          mt: 4,
          ...generalTransition(ready),
          ...generalTransitionDelay(1),
        }}
      >
        <Form
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e.currentTarget);
          }}
          onChange={handleChange}
        >
          <Stack spacing={3}>
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
            <input
              name="account"
              type="hidden"
              defaultValue={account as string}
            />
            <Button
              variant="contained"
              type="submit"
              disabled={submitDisabled}
              disableRipple={true}
            >
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
