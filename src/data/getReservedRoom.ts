"use server";

import { db } from "@/drizzle/db";
import { ReservationTable, selectReservationSchema } from "@/drizzle/schema";
import { z } from "zod";

export async function getReservedRoom() {
  const result = await db.select().from(ReservationTable);
  return result as z.infer<typeof selectReservationSchema>[];
}
