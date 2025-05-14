"use client";

import { SummaryProps } from "@/data/getDataSummary";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import SummaryChartUnit from "./summary-chart-unit";
import { Skeleton } from "../ui/skeleton";

type Props = {
  data: SummaryProps[] | null;
};

const DataSummaryCharts = ({ data }: Props) => {
  const form = useForm<{ period: string }>({
    defaultValues: {
      period: data ? data[0].period : "Jan-2024",
    },
  });
  if (data) {
    const selectedPeriod = form.watch("period");

    const foundPeriod = data.find((item) => item.period === selectedPeriod);

    return (
      <div className="w-full h-full flex flex-col gap-3">
        <div className="max-w-[240px]">
          <Form {...form}>
            <form>
              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#4E4E4E]/80 mb-1 font-normal font-serif">
                      Periode
                    </FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}>
                      <FormControl>
                        {data ? (
                          <SelectTrigger className="w-full font-semibold">
                            <SelectValue placeholder="Pilih periode" />
                          </SelectTrigger>
                        ) : (
                          <Skeleton className="w-full h-[38px]" />
                        )}
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {data ? (
                            data.map((item) => (
                              <SelectItem key={item.id} value={item.period}>
                                {new Date(
                                  item.period.replace(/-/g, "/")
                                ).toLocaleDateString("id-ID", {
                                  month: "long",
                                  year: "numeric",
                                })}
                              </SelectItem>
                            ))
                          ) : (
                            <></>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <div className="w-full h-full flex flex-col lg:grid lg:grid-flow-col lg:grid-cols-5 gap-4">
          {foundPeriod ? (
            foundPeriod.data.map((item) => (
              <SummaryChartUnit key={item.officeName} item={item} />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
};

export default DataSummaryCharts;
