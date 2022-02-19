import { createCookieSessionStorage } from "remix";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      // all of these are optional
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: true,
      secrets: [process.env.COOKIE_SECRET!],
    },
  });

export { getSession, commitSession, destroySession };
