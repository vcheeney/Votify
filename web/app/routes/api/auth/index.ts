import { ActionFunction, json } from "remix";
import { getAddressFromSignatureChallenge } from "../../../lib/auth.server";
import { commitSession, getSession } from "../../../sessions";

export const action: ActionFunction = async ({ request }) => {
  switch (request.method) {
    case "POST": {
      const session = await getSession(request.headers.get("Cookie"));
      const body = await request.json();

      const nonce = session.get("nonce");
      session.unset("nonce"); // Immediately invalidate the challenge

      console.log("nonce", nonce, body.nonce);
      if (nonce == null || body.nonce == null || body.nonce !== nonce) {
        return { success: false, error: "Challenge failed." };
      }

      const derivedAddress = await getAddressFromSignatureChallenge(
        body.address,
        body.sig,
        body.nonce
      );

      if (
        `0x${derivedAddress}`.toLowerCase() !==
        new String(body.address).toLowerCase()
      ) {
        return { success: false, error: "Signature address mismatch." };
      }

      session.set("address", body.address);

      return json(
        { success: true },
        {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        }
      );
    }
  }
};
