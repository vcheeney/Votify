import { json } from "remix";
import type { LoaderFunction } from "remix";
import { getSession } from "../../../sessions";
import { getUserFromAddress } from "../../../lib/users.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("address")) {
    return json({ success: false, error: "Not logged in." }, 200);
  }

  const user = await getUserFromAddress(session.get("address"));

  return json(
    {
      success: true,
      data: { user: { firstName: user?.firstName, lastName: user?.lastName } },
    },
    200
  );
};
