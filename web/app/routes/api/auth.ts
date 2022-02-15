import { ActionFunction, redirect } from "remix";
import { json } from "stream/consumers";
import { getAddressFromSignatureChallenge } from "../../lib/auth.server";
import { commitSession, getSession } from "../../sessions";

export const action: ActionFunction = async ({ request }) => {
  switch (request.method) {
    case "POST": {
      const body = await request.json();
      console.log(body);

      const derivedAddress = await getAddressFromSignatureChallenge(
        body.address,
        body.sig
      );

      if (
        `0x${derivedAddress}`.toLowerCase() !==
        new String(body.address).toLowerCase()
      ) {
        return { success: false };
      }

      const session = await getSession(request.headers.get("Cookie"));
      session.set("address", body.address);

      return redirect("/", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
  }
};
