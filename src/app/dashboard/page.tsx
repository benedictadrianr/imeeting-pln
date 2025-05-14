"use server";

import DataSummaryCharts from "@/components/dashboard/data-summary-charts";
import { getDataSummary, SummaryProps } from "@/data/getDataSummary";
import React from "react";

const Dashboard = async () => {
  const data: SummaryProps[] | null = await getDataSummary();
  return (
    <div className="flex flex-col h-full w-full gap-2">
      <DataSummaryCharts data={data} />
    </div>
  );
};

export default Dashboard;
