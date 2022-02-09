/* eslint-disable react/display-name */
import React, { FC } from "react";
// import { useNavigate } from "remix";
import { useEthereum } from "../lib/ethereum";
import FullPageSpinner from "./FullPageSpinner";

export function withRequiredEthereumProvider(Component: FC) {
  return () => {
    // const navigate = useNavigate();
    const { loading, ethereumExists } = useEthereum();

    if (loading) {
      return <FullPageSpinner />;
    }
    if (!ethereumExists) {
      window.location.replace("/errors/no-ethereum-provider");
      // navigate("/errors/no-ethereum-provider", {
      //   replace: true,
      // });
      return <FullPageSpinner />;
    }
    return <Component />;
  };
}
