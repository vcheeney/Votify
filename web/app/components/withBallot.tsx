/* eslint-disable react/display-name */
import React, { FC } from "react";
import { useBallot } from "~/lib/ballot";
// import { useNavigate } from "remix";
import FullPageSpinner from "./FullPageSpinner";
import { withRequiredEthereumProvider } from "./withEthereum";

export function withRequiredBallotProvider(Component: FC) {
  return withRequiredEthereumProvider(() => {
    const { loading, ballotExists } = useBallot();

    if (loading) {
      return <FullPageSpinner />;
    }
    if (!ballotExists) {
      window.location.replace("/errors/ballot-not-found");
      // navigate("/errors/no-ethereum-provider", {
      //   replace: true,
      // });
      return <FullPageSpinner />;
    }
    return <Component />;
  });
}
