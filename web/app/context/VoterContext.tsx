import { createContext, FC, useContext, useEffect, useState } from "react";
import { VerifyWalletPage } from "../components/VerifyWalletPage";
import { createSignatureMessage } from "../lib/auth";
import { useVoterStatus } from "../hooks/useVoterStatus";
import { useEthereum } from "./EthereumContext";

interface Voter {
  firstName: string;
  lastName: string;
}

interface VoterContextInterface {
  loading: boolean;
  voter?: Voter;
  verifyWallet: () => Promise<void>;
}

const VoterContext = createContext<VoterContextInterface>({
  loading: true,
  voter: undefined,
  verifyWallet: async () => {},
});

export const VoterProvider: FC<{}> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [voter, setVoter] = useState<Voter>();
  const { account, signer, loading: ethereumLoading } = useEthereum();
  const voterStatus = useVoterStatus();
  const needsVerify =
    (voterStatus === "registered" || voterStatus === "voted") && voter == null;

  async function fetchMe() {
    const currentUserRes = await fetch(`api/user/me`);
    const currentUserJson = await currentUserRes.json();

    if (currentUserJson.success) {
      return currentUserJson.data.user;
    }

    return null;
  }

  async function verifyWallet() {
    if (account == null || signer == null) {
      return;
    }

    let signature: string;
    try {
      signature = await signer.signMessage(createSignatureMessage(account));
    } catch (e) {
      console.log("Failed to sign");
      return;
    }

    await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: account,
        sig: signature,
      }),
    });
  }

  async function fetchRegistredVoter() {
    setLoading(true);
    console.log(
      "[VoterContext] Fetching voter information for wallet",
      account
    );

    const me = await fetchMe();

    if (me == null) {
      setLoading(false);
      return;
    }

    setVoter({ firstName: me.firstName, lastName: me.lastName });
    setLoading(false);
  }

  useEffect(() => {
    fetchRegistredVoter();
  }, [account, voterStatus]);

  return (
    <VoterContext.Provider
      value={{
        loading,
        voter,
        verifyWallet,
      }}
    >
      {needsVerify ? <VerifyWalletPage /> : children}
    </VoterContext.Provider>
  );
};

export function useVoter() {
  return useContext(VoterContext);
}
