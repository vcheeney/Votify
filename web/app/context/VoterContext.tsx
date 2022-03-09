import { createContext, FC, useContext, useEffect, useState } from "react";
import { createSignatureMessage } from "../lib/auth";
import { useVoterStatus } from "../hooks/useVoterStatus";
import { useEthereum } from "./EthereumContext";
import { useLocation, useNavigate } from "remix";

export interface Voter {
  firstName: string;
  lastName: string;
}

interface VoterContextInterface {
  voter?: Voter;
  verifyWallet: () => Promise<boolean>;
}

const VoterContext = createContext<VoterContextInterface>({
  voter: undefined,
  verifyWallet: async () => false,
});

const UNPROTECTED_ROUTES = [
  "/",
  "/results",
  "/getstarted/register",
  "/getstarted/verify",
  "/errors/ballot-not-found",
  "/errors/no-ethereum-provider",
  "/errors/nonce-too-high",
];
const isProtected = (route: string) => !UNPROTECTED_ROUTES.includes(route);

export const VoterProvider: FC = ({ children }) => {
  const [voter, setVoter] = useState<Voter>();
  const { account, signer, loading: ethereumLoading } = useEthereum();
  const voterStatus = useVoterStatus();
  const navigate = useNavigate();
  const location = useLocation();

  const needsVerify =
    (voterStatus === "registered" || voterStatus === "voted") && voter == null;

  async function fetchMe() {
    const currentUserRes = await fetch(`/api/user/me`);
    const currentUserJson = await currentUserRes.json();

    if (currentUserJson.success) {
      return currentUserJson.data.user;
    }

    return null;
  }

  async function verifyWallet() {
    if (account == null || signer == null) {
      return false;
    }

    let signature: string;
    try {
      signature = await signer.signMessage(createSignatureMessage(account));
    } catch (e) {
      console.log("[VoterContext] Failed to sign");
      return false;
    }

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: account,
        sig: signature,
      }),
    });

    const json = await res.json();

    return !!json.success;
  }

  useEffect(() => {
    const isCurrentRouteProtected = isProtected(window.location.pathname);

    async function refreshContext() {
      if (ethereumLoading) {
        return;
      }

      if (isCurrentRouteProtected && !account) {
        navigate("/getstarted");
      }

      if (isCurrentRouteProtected && voterStatus === "unregistered") {
        navigate("/getstarted/register");
        return;
      }

      if (voter != null) {
        return;
      }

      console.log(
        "[VoterContext] Fetching voter information for wallet",
        account
      );

      const me = await fetchMe();

      if (isCurrentRouteProtected && me == null) {
        navigate(`/getstarted/verify?redirect=${location.pathname}`);
        return;
      }

      if (me != null) {
        setVoter({ firstName: me.firstName, lastName: me.lastName });
      }
    }

    refreshContext();
  }, [ethereumLoading, account, voterStatus]);

  return (
    <VoterContext.Provider
      value={{
        voter,
        verifyWallet,
      }}
    >
      {children}
    </VoterContext.Provider>
  );
};

export function useVoter() {
  return useContext(VoterContext);
}
