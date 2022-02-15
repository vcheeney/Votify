import { createCookieSessionStorage } from "remix";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      // all of these are optional
      httpOnly: true,
      maxAge: 60,
      path: "/",
      sameSite: "strict",
      secrets: ["s3cret1"],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
