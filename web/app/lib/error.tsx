import { Box, Button, Typography } from "@mui/material";
import { Link } from "remix";

const RefreshThePageButton = () => (
  <Button
    variant="contained"
    sx={{
      mt: 4,
    }}
    onClick={() => {
      window.location.reload();
    }}
  >
    Refresh the page
  </Button>
);

export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
  renderBody() {
    return <span></span>;
  }
  renderActionButton() {
    return (
      <Button
        variant="contained"
        component={Link}
        to="/"
        replace={true}
        sx={{
          mt: 4,
        }}
      >
        Back to home
      </Button>
    );
  }
}

export class MetaMaskRequiredError extends CustomError {
  constructor() {
    super("MetaMask is required");
  }
  renderBody() {
    return (
      <Box>
        <Typography variant="body1">
          You can download the extension{" "}
          <a href="https://metamask.io/" target="_blank">
            here
          </a>
          .
        </Typography>
        <Typography variant="body1">Then, try refreshing the page.</Typography>
      </Box>
    );
  }
  renderActionButton() {
    return <RefreshThePageButton />;
  }
}

export class BallotNotFoundError extends CustomError {
  networkName: string;

  constructor(networkName: string) {
    super("Ballot not found on this network");
    this.networkName = networkName;
  }
  renderBody() {
    return (
      <Box>
        <Typography variant="body1">
          The ballot is not deployed on the current network ({this.networkName}
          ).
        </Typography>
        <Typography variant="body1">
          Try selecting another network in the MetaMask extension and refresh
          the page.
        </Typography>
      </Box>
    );
  }
  renderActionButton() {
    return <RefreshThePageButton />;
  }
}

export class NotRegisteredError extends CustomError {
  constructor() {
    super("You are not registered to vote");
  }
  renderBody() {
    return (
      <Box>
        <Typography variant="body1">
          You must be a registered voter to vote.
        </Typography>
      </Box>
    );
  }
  renderActionButton() {
    return (
      <Button
        variant="contained"
        component={Link}
        to="/register"
        replace={true}
        sx={{
          mt: 4,
        }}
      >
        Register
      </Button>
    );
  }
}
