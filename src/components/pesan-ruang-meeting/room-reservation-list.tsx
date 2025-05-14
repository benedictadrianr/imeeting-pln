import { selectReservationSchema } from "@/drizzle/schema";
import React from "react";
import { z } from "zod";
import RoomReservationItem from "./room-reservation-item";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";

type Props = {
  data: z.infer<typeof selectReservationSchema>[];
};

const RoomReservationList = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {data.length === 0 ? (
        <>
          <Card className="w-full max-h-[250px] flex p-4 gap-3 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Skeleton className="rounded-full size-12" />
              <div className="flex flex-col gap-2 w-[150px]">
                <Skeleton className="rounded-full h-5 w-full" />
                <Skeleton className="rounded-full h-5 w-full" />
              </div>
            </div>
            <Separator />
            <div className="flex w-full h-full gap-4">
              <div className="flex flex-col gap-3 w-[200px]">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
              <div className="flex flex-col gap-3 w-[200px]">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
            </div>
          </Card>
        </>
      ) : (
        data.map((item) => <RoomReservationItem key={item.id} item={item} />)
      )}
    </div>
  );
};

export default RoomReservationList;
