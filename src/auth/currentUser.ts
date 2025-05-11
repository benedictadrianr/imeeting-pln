import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getUserFromSession } from "./session";

type User = Exclude<
  Awaited<ReturnType<typeof getUserFromSession>>,
  undefined | null
>;

function _getCurrentUser(options: {
  redirectIfNotFound: true;
  redirectIfFound?: false;
}): Promise<User>;
function _getCurrentUser(options: {
  redirectIfFound: true;
  redirectIfNotFound?: false;
}): Promise<null>;
function _getCurrentUser(options?: {
  redirectIfNotFound?: boolean;
  redirectIfFound?: boolean;
}): Promise<User | null>;

async function _getCurrentUser({
  redirectIfNotFound = false,
  redirectIfFound = false,
} = {}) {
  const user = await getUserFromSession(await cookies());

  if (user == null) {
    if (redirectIfNotFound) redirect("/");
    return null;
  }

  if (redirectIfFound) {
    redirect("/dashboard");
  }

  return user;
}

export const getCurrentUser = cache(_getCurrentUser);
