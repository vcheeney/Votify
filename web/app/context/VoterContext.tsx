import {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "remix";
import invariant from "tiny-invariant";
import { FullPageSpinner } from "~/components/FullPageSpinner";
import { NotRegisteredError } from "../lib/error";
import { getUserFromAddress } from "../lib/users";
import { useEthereum } from "./EthereumContext";

interface Voter {
  firstName: string;
  lastName: string;
}

interface VoterContextInterface {
  loading: boolean;
  voter?: Voter;
  registerVoter: (
    address: string,
    secretCode: string,
    dateOfBirth: Date
  ) => void;
}

const UNPROTECTED_ROUTES = ["/"];
const isProtected = (route: string) => !UNPROTECTED_ROUTES.includes(route);

const VoterContext = createContext<VoterContextInterface>({
  loading: true,
  voter: undefined,
  registerVoter: () => {},
});

export const VoterProvider: FC<{}> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [voter, setVoter] = useState<Voter>();
  const { account, loading: ethereumLoading } = useEthereum();
  const navigate = useNavigate();

  if (loading || ethereumLoading) {
    return <FullPageSpinner />;
  }

  if (account == null && isProtected(window.location.pathname)) {
    throw new NotRegisteredError();
  }

  useEffect(() => {
    console.log("Effect");
    async function fetchRegistredVoter() {
      console.log("Fetching", account);
      if (account == null) {
        return;
      }

      const user = await getUserFromAddress(account);

      if (user == null) {
        return;
      }

      setVoter({ firstName: user.firstName, lastName: user.lastName });
    }

    fetchRegistredVoter();
  }, [account]);

  async function handleRegisterVoter(
    address: string,
    secretCode: string,
    dateOfBirth: Date
  ) {}

  return (
    <VoterContext.Provider
      value={{
        loading,
        voter,
        registerVoter: handleRegisterVoter,
      }}
    >
      {children}
    </VoterContext.Provider>
  );
};

export function useVoter() {
  return useContext(VoterContext);
}
