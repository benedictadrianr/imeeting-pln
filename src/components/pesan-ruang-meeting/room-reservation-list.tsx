import { selectReservationSchema } from "@/drizzle/schema";
import React from "react";
import { z } from "zod";
import { Card } from "../ui/card";
import { add } from "date-fns";

type Props = {
  data: z.infer<typeof selectReservationSchema>[];
};

const RoomReservationList = ({ data }: Props) => {
  return (
    <div>
      {data.map((item) => (
        <Card key={item.id}>
          <p>Date:{add(item.date, { days: 1 }).toDateString()}</p>
          <p>
            Start time: {add(new Date(item.timeStart), { hours: 7 }).getHours()}
            :00
          </p>
          <p>
            End time: {add(new Date(item.timeEnd), { hours: 7 }).getHours()}:00
          </p>
        </Card>
      ))}
    </div>
  );
};

export default RoomReservationList;
