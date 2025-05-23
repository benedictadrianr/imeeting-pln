export const dynamic = "force-dynamic";

import RoomReservationList from "@/components/pesan-ruang-meeting/room-reservation-list";
import { db } from "@/drizzle/db";
import { ReservationTable, selectReservationSchema } from "@/drizzle/schema";
import { desc } from "drizzle-orm";
import React from "react";
import { z } from "zod";

const RuangMeeting = async () => {
  const result = (await db
    .select()
    .from(ReservationTable)
    .orderBy(desc(ReservationTable.createdAt))) as z.infer<
    typeof selectReservationSchema
  >[];
  return (
    <div>
      <RoomReservationList data={result} />
    </div>
  );
};

export default RuangMeeting;
