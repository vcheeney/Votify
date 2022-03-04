import { Button } from "@mui/material";
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
