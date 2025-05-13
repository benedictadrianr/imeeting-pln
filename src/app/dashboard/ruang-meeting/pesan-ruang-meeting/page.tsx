"use server";

import { Card } from "@/components/ui/card";
import React from "react";
import { getUnit, UnitProps } from "@/data/getUnit";
import CreateRoomForm from "@/components/pesan-ruang-meeting/createRoomForm";
import { getKonsumsi, KonsumsiProps } from "@/data/getJenisKonsumsi";
import { getRoom, RoomProps } from "@/data/getMeetingRooms";

const PesanRuangMeeting = async () => {
  const unitData: UnitProps[] | null = await getUnit();
  const roomData: RoomProps[] | null = await getRoom();
  const konsumsiData: KonsumsiProps[] | null = await getKonsumsi();

  return (
    <Card className="w-full h-full rounded-[8px] px-7 bg-white">
      <CreateRoomForm
        unitData={unitData}
        roomData={roomData}
        konsumsiData={konsumsiData}
      />
    </Card>
  );
};

export default PesanRuangMeeting;
