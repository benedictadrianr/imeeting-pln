import { z } from "zod";
import { pgEnum } from "drizzle-orm/pg-core";

export const userRoles = ["user", "admin", "super-admin"] as const;
export type UserRole = (typeof userRoles)[number];
export const userRoleEnum = pgEnum("user_roles", userRoles);

export const signInSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(50, { message: "Name must be at most 50 characters" }),
  role: z.enum(userRoles, { required_error: "Must choose between the roles." }),
});
