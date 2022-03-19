export async function startChallenge() {
  const res = await fetch("/api/auth/challenge");
  if (res.ok) {
    const json = await res.json();
    return json.data.nonce;
  }
}

export function createSignatureMessage(address: string, nonce: string) {
  return `
Welcome to Votify!

Click to verify that you own this account

This request will not trigger a blockchain transaction or cost any gas fees.

Wallet address:
${address}

Nonce:
${nonce}
`;
}
