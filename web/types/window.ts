export {};

declare global {
  interface Window {
    ENV: {
      BALLOT_CONTRACT_ADDRESS: string;
    };
  }
}
