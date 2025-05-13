import { selectReservationSchema } from "@/drizzle/schema";
import React from "react";
import { z } from "zod";
import { Card } from "../ui/card";
import { add } from "date-fns";
import { Building, DoorOpen, Clock, Users, Calendar } from "lucide-react";

type Props = {
  item: z.infer<typeof selectReservationSchema>;
};

const RoomReservationItem = ({ item }: Props) => {
  return (
    <Card key={item.id} className="px-4 gap-3 max-h-[150px]">
      <div className="flex gap-2 items-baseline-last">
        <div className="text-lg flex gap-1 min-w-[200px]">
          <Building /> <h1>{item.office.officeName}</h1>
        </div>

        <div className="flex gap-1">
          <DoorOpen /> <h2>{item.room?.roomName}</h2>
        </div>
      </div>
      <div className="flex gap-1">
        <Users />
        <p>{item.amount}</p>
      </div>
      <div className="flex gap-2">
        <div className="flex min-w-[200px] gap-1">
          <Calendar /> <p>{item.date.toDateString()}</p>
        </div>
        <Clock />
        <p>
          {add(new Date(item.timeStart), { hours: 7 }).getHours()}
          :00
        </p>
        -<p>{add(new Date(item.timeEnd), { hours: 7 }).getHours()}:00</p>
      </div>
    </Card>
  );
};

export default RoomReservationItem;
