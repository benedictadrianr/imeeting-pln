"use server";

import { z, ZodError } from "zod";
import { signInSchema } from "./schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createUserSession, removeUserFromSession } from "./session";

export async function signIn(data: z.infer<typeof signInSchema>) {
  const parsed = signInSchema.safeParse(data);

  if (!parsed.success) {
    const zodError = parsed.error as ZodError;
    const fieldErrors: Record<string, string> = {};
    zodError.errors.forEach((issue) => {
      const field = issue.path[0];
      if (typeof field === "string") {
        fieldErrors[field] = issue.message;
      }
    });
    return { success: false, errors: fieldErrors };
  }

  const result = parsed.data;

  await createUserSession(result, await cookies());

  redirect("/dashboard");
}

export async function logOut() {
  await removeUserFromSession(await cookies());
  redirect("/");
}
