import { selectReservationSchema } from "@/drizzle/schema";
import React from "react";
import { z } from "zod";
import { Card } from "../ui/card";
import { add, format } from "date-fns";
import {
  Building,
  DoorOpen,
  Clock,
  Users,
  Calendar,
  HandPlatter,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { id } from "date-fns/locale";

type Props = {
  item: z.infer<typeof selectReservationSchema>;
};

const RoomReservationItem = ({ item }: Props) => {
  const tanpaKonsumsi = item.foodType.length === 0;
  const formattedDate = format(new Date(item.createdAt), `d MMMM, HH:mm`, {
    locale: id,
  });
  return (
    <Card key={item.id} className="p-4 gap-3 min-h-[203px]">
      <div className="flex items-center gap-2">
        <Avatar className="size-10 ">
          <AvatarImage />
          <AvatarFallback>
            {(item.username ?? "P N")
              .split(" ")
              .slice(0, 2)
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p
            title="Pengaju Ruangan"
            className="font-semibold text-sm md:text-base">
            {item.username}
          </p>
          <p
            title="Tanggal Pengajuan"
            className="text-xs md:text-sm text-zinc-500">
            {formattedDate}
          </p>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex items-end gap-1 min-w-[200px]" title="Unit/Gedung">
          <Building />{" "}
          <h1 className="text-sm md:text-base">{item.office.officeName}</h1>
        </div>

        <div className="flex items-end gap-1" title="Ruangan">
          <DoorOpen />{" "}
          <h2 className="text-sm md:text-base">{item.room?.roomName}</h2>
        </div>
      </div>
      <div className="flex gap-2 flex-col sm:flex-row" title="Total Peserta">
        <div className="flex items-end gap-1 min-w-[200px]">
          <Users />
          <p className="text-sm md:text-base">{item.amount}</p>
        </div>
        <div className="flex items-end gap-1" title="Jenis Konsumsi">
          <HandPlatter className={tanpaKonsumsi ? "opacity-30" : ""} />
          <p
            className={`${tanpaKonsumsi && "opacity-30"} text-sm md:text-base`}>
            {item.foodType.length === 0
              ? "Tanpa konsumsi"
              : item.foodType.map((food) => (
                  <span key={food} className="group">
                    {food}
                    <span className="group-last:hidden">, </span>
                  </span>
                ))}
          </p>
        </div>
      </div>
      <div className="flex gap-2 flex-col sm:flex-row">
        <div
          className="flex items-end min-w-[200px] gap-1"
          title="Tanggal Meeting">
          <Calendar />{" "}
          <p className="text-sm md:text-base">
            {add(item.date, { days: 1 }).toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-end gap-1" title="Jam Meeting">
          <Clock />
          <p className="text-sm md:text-base">
            {add(new Date(item.timeStart), { hours: 7 }).getHours()}
            :00
          </p>
          -
          <p className="text-sm md:text-base">
            {add(new Date(item.timeEnd), { hours: 7 }).getHours()}:00
          </p>
        </div>
      </div>
    </Card>
  );
};

export default RoomReservationItem;
