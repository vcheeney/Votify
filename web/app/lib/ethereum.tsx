import { ethers } from "ethers";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import invariant from "tiny-invariant";

const HARDHAT_CHAIN_ID = 31337;

type Network = ethers.providers.Network & {
  connected: boolean;
};

interface EthereumContextInterface {
  loading: boolean;
  ethereumExists: boolean;
  network: Network | null;
  account: string | null;
  connectWithMetamask: () => void;
}

const EthereumContext = createContext<EthereumContextInterface>({
  loading: true,
  ethereumExists: false,
  network: null,
  account: null,
  connectWithMetamask: () => {},
});

function useEthereumInternal() {
  const [loading, setLoading] = useState(true);
  const [ethereumExists, setEthereumExists] = useState(false);
  const [network, setNetwork] = useState<Network | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const providerRef = useRef<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    const ethereum = window.ethereum;

    setEthereumExists(!!ethereum);
    setLoading(false);

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any" // https://github.com/ethers-io/ethers.js/issues/866
      );
      providerRef.current = provider;
      getAccountAddress();

      provider.on("network", handleNetworkChange);

      // TODO: Detect les account changes

      return () => {
        provider.off("network", handleNetworkChange);
      };
    }
  }, []);

  function handleNetworkChange(network: ethers.providers.Network) {
    const provider = providerRef.current;
    invariant(provider, "Provider should be defined");
    const newNetwork: Network = {
      ...network,
      name: network.chainId === HARDHAT_CHAIN_ID ? "hardhat" : network.name,
      connected: false,
    };
    setNetwork(newNetwork);
    provider.getBlockNumber().then((blockNumber: number) => {
      setNetwork((prev) => {
        invariant(prev, "Network should be defined");
        return {
          ...prev,
          connected: true,
        };
      });
    });
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
      setAccount(address);
    } catch (error) {
      console.log("user is not logged in");
    }
  }

  return {
    loading,
    ethereumExists,
    network,
    account,
    connectWithMetamask,
  };
}

export const EthereumProvider: FC<{}> = ({ children }) => {
  const value = useEthereumInternal();
  return (
    <EthereumContext.Provider value={value}>
      {children}
    </EthereumContext.Provider>
  );
};

export function useEthereum() {
  return useContext(EthereumContext);
}
