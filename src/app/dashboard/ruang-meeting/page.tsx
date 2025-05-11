"use server";

import RoomReservationList from "@/components/pesan-ruang-meeting/room-reservation-list";
import { getReservedRoom } from "@/data/getReservedRoom";
import React from "react";

const RuangMeeting = async () => {
  const result = await getReservedRoom();
  return (
    <div>
      <RoomReservationList data={result} />
    </div>
  );
};

export default RuangMeeting;
