"use server";

import { db } from "@/drizzle/db";
import { insertReservationSchema, ReservationTable } from "@/drizzle/schema";
import { z } from "zod";

type SubmitReservationResult =
  | { success: true }
  | { success: false; errors: Record<string, string> };

export async function submitReservations(
  unsafeData: z.infer<typeof insertReservationSchema>
): Promise<SubmitReservationResult> {
  try {
    const parsed = insertReservationSchema.safeParse(unsafeData);

    if (!parsed.success) {
      const zodError = parsed.error;
      const fieldErrors: Record<string, string> = {};
      zodError.errors.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === "string") {
          fieldErrors[field] = issue.message;
        }
      });
      return { success: false, errors: fieldErrors };
    }

    const finalData = {
      ...parsed.data,
    };

    const result = await db.insert(ReservationTable).values(finalData);

    if (result == null) {
      return { success: false, errors: { general: "unable to insert data" } };
    } else {
      return { success: true };
    }
  } catch (err) {
    console.error("DB Insert Error:", err);
    return {
      success: false,
      errors: { general: `Internal server error.${err}` },
    };
  }
}
