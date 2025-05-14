"use client";
import React from "react";
import { Bar, BarChart, Pie, PieChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { CustomizedLabel } from "./customized-label";
import { RoomProps } from "@/data/getDataSummary";

type Props = {
  room: RoomProps;
};

const SummaryChartRoom = ({ room }: Props) => {
  function calculateNominal(
    cost: { name: string; package: number; price: number }[]
  ): number {
    let result = 0;
    for (let i = 0; i < cost.length; i++) {
      if (cost[i].name.includes("Snack")) {
        result += cost[i].package * 20000;
      } else if (cost[i].name.includes("Makan")) {
        result += cost[i].package * 30000;
      }
    }
    return result;
  }

  const chartData = [
    {
      name: "filled",
      value: Number(room.averageOccupancyPerMonth),
      fill: "#3d7d8f",
    },
    {
      name: "empty",
      value: 100 - Number(room.averageOccupancyPerMonth),
      fill: "#ccc",
    },
  ];

  const chartConfig = {
    totalPackage: {
      label: "Total Package",
      color: "#3D7D8F",
    },
  } satisfies ChartConfig;

  const pieChartConfig = {
    value: {
      label: "Value",
    },
    filled: {
      label: "Percentage",
      color: "#3D7D8F",
    },
    empty: {
      label: "Remaining",
      color: "#000",
    },
  } satisfies ChartConfig;
  return (
    <div>
      <h1 className="text-sm text-[rgb(78,78,78)]">{room.roomName}</h1>
      <div className="flex justify-between">
        <div className="flex-initial w-[120px]">
          <p className="text-xs text-[#625B71] text-wrap">
            Presentase Pemakaian
          </p>
          <p className="text-xl font-bold">{room.averageOccupancyPerMonth}%</p>
        </div>
        <div className="w-[38px] h-[38px]">
          <ChartContainer config={pieChartConfig} className="w-full h-full">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    hideLabel
                    formatter={(value, name) =>
                      name === "filled" || name === "empty"
                        ? `${Number(value).toFixed(0)}%`
                        : ""
                    }
                  />
                }
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={10}
                outerRadius={19}
                paddingAngle={0}
                startAngle={90}
                endAngle={-270}
              />
            </PieChart>
          </ChartContainer>
        </div>
      </div>
      <div>
        <p className="text-xs text-[#625B71]">Nominal Konsumsi</p>
        <p className="text-lg text-nowrap font-bold">
          Rp{" "}
          {calculateNominal(
            room.totalConsumption.map((num) => ({
              name: num.name,
              package: Number(num.totalPackage),
              price: Number(num.totalPrice),
            }))
          ).toLocaleString()}
        </p>
      </div>
      <div className="w-full h-fit">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={room.totalConsumption}
            layout="vertical"
            barSize={8}
            barGap={7}>
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10 }}
              width={40}
            />
            <Bar
              dataKey="totalPackage"
              fill="#3D7D8F"
              radius={2}
              minPointSize={5}
              label={<CustomizedLabel />}
            />
            <XAxis type="number" domain={[0, 500]} hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default SummaryChartRoom;
