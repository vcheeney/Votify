import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  ActionFunction,
  Form,
  json,
  SubmitFunction,
  useActionData,
  useNavigate,
  useSubmit,
  useTransition,
} from "remix";
import { FullPageSpinner } from "~/components/FullPageSpinner";
import { WaitingDialog } from "~/components/WaitingDialog";
import { useEthereum } from "~/context/EthereumContext";
import { useVoter } from "~/context/VoterContext";
import { usePageReady } from "~/hooks/usePageReady";
import { useVoterStatus } from "~/hooks/useVoterStatus";
import { giveRightToVote } from "~/lib/ballot";
import { generalTransition, generalTransitionDelay } from "~/lib/transitions";
import { registerUser } from "~/lib/users.server";
import { isFormDataStringValid, isStringValidUUID } from "../../lib/utils";

type FormErrors = { [field: string]: string };

function getAndValidateFormData(formData: FormData) {
  const errors: FormErrors = {};
  const account = formData.get("account");
  const secretCode = formData.get("secretCode");
  const dateOfBirth = formData.get("dateOfBirth");

  if (!isFormDataStringValid(account)) {
    errors["account"] = "Account is required";
  }

  if (!isFormDataStringValid(secretCode)) {
    errors["secretCode"] = "Secret code is required";
  } else {
    if (!isStringValidUUID(secretCode)) {
      errors["secretCode"] = "Invalid secret code format";
    }
  }

  if (!isFormDataStringValid(dateOfBirth)) {
    errors["dateOfBirth"] = "Date of birth is required";
  }

  return {
    account: account as string,
    secretCode: secretCode as string,
    dateOfBirth: dateOfBirth as string,
    errors,
  };
}

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();

  const { account, secretCode, dateOfBirth, errors } =
    getAndValidateFormData(body);

  try {
    await registerUser(secretCode, new Date(dateOfBirth), account);
  } catch (e) {
    return json({
      registerSuccess: false,
      errors,
    });
  }

  const rightToVoteSuccess = await giveRightToVote(account);

  return json({
    registerSuccess: true,
    rightToVoteSuccess: true,
    errors: errors,
  });
};

export default function GetStartedRegister() {
  const status = useVoterStatus();
  const { loading, account } = useEthereum();
  const transition = useTransition();
  const actionData = useActionData();
  const submit = useSubmit();
  const { verifyWallet, refreshVoter } = useVoter();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const navigate = useNavigate();
  const ready = usePageReady(!loading && status === "unregistered");

  useEffect(() => {
    refreshVoter();
  }, []);

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
        open={!!actionData?.registerSuccess && !!actionData?.rightToVoteSuccess}
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
            {actionData?.registerSuccess === false && (
              <Alert severity="error">
                Failed to register your account.
                <br />
                Verify that you entered your secret code and date of birth
                correctly
              </Alert>
            )}
            {actionData?.rightToVoteSuccess === false && (
              <Alert severity="error">
                {/* // TODO: come up with a better message for this  */}
                Failed to give you the right to vote
              </Alert>
            )}
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
            {actionData?.errors?.secretCode != null && (
              <Alert severity="error">{actionData?.errors?.secretCode}</Alert>
            )}
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
            <Alert severity="warning">
              Make sure you are linking the right account. Your secret codes can
              only be used once
            </Alert>
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
