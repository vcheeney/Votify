import { JsonRpcSigner } from "@ethersproject/providers";
import { ethers } from "ethers";
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

type Network = ethers.providers.Network & {
  connected: boolean;
};

interface EthereumContextInterface {
  loading: boolean;
  ethereumExists: boolean;
  network: Network | null;
  account: string | null;
  signer?: JsonRpcSigner;
  connectWithMetamask: () => void;
  logoutEthereumAccount: () => void;
}

export const HARDHAT_CHAIN_ID = 31337;

const UNPROTECTED_ROUTES = [
  "/",
  "/errors/ballot-not-found",
  "/errors/no-ethereum-provider",
  "/errors/nonce-too-high",
];
const isProtected = (route: string) => !UNPROTECTED_ROUTES.includes(route);

const EthereumContext = createContext<EthereumContextInterface>({
  loading: true,
  ethereumExists: false,
  network: null,
  account: null,
  connectWithMetamask: () => {},
  logoutEthereumAccount: () => {},
});

export const EthereumProvider: FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [ethereumExists, setEthereumExists] = useState(false);
  const [network, setNetwork] = useState<Network | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const providerRef = useRef<ethers.providers.Web3Provider | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ethereum = window.ethereum;

    setEthereumExists(!!ethereum);

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any" // https://github.com/ethers-io/ethers.js/issues/866
      );
      providerRef.current = provider;

      getAccountAddress().then(() => {
        setLoading(false);
      });

      provider.on("network", handleNetworkChange);
      ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        provider.off("network", handleNetworkChange);
        ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!ethereumExists && isProtected(window.location.pathname)) {
      navigate("/errors/no-ethereum-provider");
    }
  }, [ethereumExists, loading]);

  function handleNetworkChange(network: ethers.providers.Network) {
    const provider = providerRef.current;
    invariant(provider, "Provider should be defined");
    const newNetwork: Network = {
      ...network,
      name: network.chainId === HARDHAT_CHAIN_ID ? "hardhat" : network.name,
      connected: false,
    };
    setNetwork(newNetwork);
    provider.getBlockNumber().then(() => {
      setNetwork((prev) => {
        invariant(prev, "Network should be defined");
        return {
          ...prev,
          connected: true,
        };
      });
    });
  }

  function handleAccountsChanged(accounts: string[]) {
    if (!accounts.length) {
      logoutEthereumAccount();
    } else {
      setAccount(accounts[0]);
      // TODO: Destroy session / login the other account and setup new session?
    }
  }

  function logoutEthereumAccount() {
    setAccount(null);
  }

  async function connectWithMetamask() {
    const provider = providerRef.current;
    invariant(provider, "Provider should be defined");
    await provider.send("eth_requestAccounts", []);
    getAccountAddress();
  }

  async function getAccountAddress() {
    const provider = providerRef.current;
    invariant(provider, "Provider should be defined");
    try {
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setSigner(signer);
      setAccount(address);
    } catch (error) {
      console.log("[EthereumContext] User is not logged in");
    }
  }

  const value: EthereumContextInterface = {
    loading,
    ethereumExists,
    network,
    account,
    signer,
    connectWithMetamask,
    logoutEthereumAccount,
  };

  return (
    <EthereumContext.Provider value={value}>
      {children}
    </EthereumContext.Provider>
  );
};

export function useEthereum() {
  return useContext(EthereumContext);
}
