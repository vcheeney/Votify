import utils from "ethereumjs-util";
import { createSignatureMessage } from "./auth";

export async function getAddressFromSignatureChallenge(
  address: string,
  rcpSig: string
) {
  const challenge = createSignatureMessage(address);

  const sig = utils.fromRpcSig(rcpSig);
  const hash = utils.hashPersonalMessage(Buffer.from(challenge));
  const publicKey = utils.ecrecover(hash, sig.v, sig.r, sig.s);
  const derivedAddress = utils.pubToAddress(publicKey).toString("hex");

  return derivedAddress;
}
