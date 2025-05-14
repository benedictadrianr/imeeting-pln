"use client";

import React from "react";
import Statistic from "../../../public/statistic.png";
import Image from "next/image";
import { UnitProps } from "@/data/getDataSummary";
import { Card } from "../ui/card";
import SummaryChartRoom from "./summary-chart-room";
import { Skeleton } from "../ui/skeleton";

type Props = {
  item: UnitProps;
};

const SummaryChartUnit = ({ item }: Props) => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex gap-2 items-baseline max-h-9">
        <div className="size-[16px]">
          <Image alt="statistic" src={Statistic} />
        </div>
        {item ? (
          <p
            title={item.officeName}
            className="text-[#868E96] font-semibold line-clamp-1">
            {item.officeName}
          </p>
        ) : (
          <Skeleton className="h-[30px] w-3/4" />
        )}
      </div>
      <div className="overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden max-h-[65vh] w-full max-w-[79vw] sm:max-w-[85vw] md:max-w-[90vw] lg:max-w-full scrollbar-thin">
        <div className="flex flex-row w-full lg:flex-col gap-3 px-3 py-3 lg:px-0">
          {item.detailSummary.map((room) => (
            <>
              {room ? (
                <Card
                  key={room.roomName}
                  className="p-3 gap-1 bg-[#F2F2F2] border-0 rounded-md h-[230px] max-w-[210px]">
                  <SummaryChartRoom room={room} />
                </Card>
              ) : (
                <Skeleton className="h-[230px] w-[210px]" />
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryChartUnit;
