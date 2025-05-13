import { selectReservationSchema } from "@/drizzle/schema";
import React from "react";
import { z } from "zod";
import RoomReservationItem from "./room-reservation-item";

type Props = {
  data: z.infer<typeof selectReservationSchema>[];
};

const RoomReservationList = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {data.length === 0 ? (
        <div className="w-full h-[150px] flex items-center justify-center text-muted-foreground">
          There is no data
        </div>
      ) : (
        data.map((item) => <RoomReservationItem key={item.id} item={item} />)
      )}
    </div>
  );
};

export default RoomReservationList;
