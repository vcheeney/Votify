import { LoaderFunction, json } from "remix";
import { commitSession, getSession } from "../../../sessions";
import crypto from "crypto";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const nonce = crypto.randomBytes(16).toString("base64");
  session.set("nonce", nonce);

  return json(
    { success: true, data: { nonce: nonce } },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};
