export function createSignatureMessage(address: string) {
  return `
Welcome to Votify!

Click to verify that you own this account

This request will not trigger a blockchain transaction or cost any gas fees.

Wallet address:
${address}
`;
}
