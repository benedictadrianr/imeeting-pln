"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { add, format, isBefore, isEqual, startOfDay } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { UnitProps } from "@/data/getUnit";
import { RoomProps } from "@/data/getMeetingRooms";
import { KonsumsiProps } from "@/data/getJenisKonsumsi";
import { Checkbox } from "../ui/checkbox";
import { submitReservations } from "@/data/submitReservations";
import { toast } from "sonner";
import { insertReservationSchema } from "@/drizzle/schema";
import { useDateUtils } from "@/hooks/useDateUtils";

type Props = {
  unitData?: UnitProps[] | null;
  roomData?: RoomProps[] | null;
  konsumsiData?: KonsumsiProps[] | null;
};

const CreateRoomForm = ({ unitData, roomData, konsumsiData }: Props) => {
  const today = startOfDay(new Date());
  const form = useForm<z.infer<typeof insertReservationSchema>>({
    resolver: zodResolver(insertReservationSchema),
    defaultValues: {
      office: undefined,
      room: undefined,
      date: today,
      timeStart: undefined,
      timeEnd: undefined,
      amount: undefined,
      foodType: [],
      cost: undefined,
    },
  });
  const selectedDate = form.watch("date");
  const { memoizedToday, timeOptions } = useDateUtils(selectedDate);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const selectedUnit = form.watch("office");
  const selectedRoom = form.watch("room");
  const selectedStart = new Date(form.watch("timeStart"));
  const selectedEnd = new Date(form.watch("timeEnd"));
  const amountPeople = form.watch("amount");
  const foodType = form.watch("foodType");
  const filteredRoomData =
    roomData?.filter((room) => room.officeId === selectedUnit?.id) ?? [];

  const shouldDisableKonsumsiOption = (
    itemName: string,
    timeStart?: Date,
    timeEnd?: Date
  ): boolean => {
    if (!timeStart || !timeEnd) return true;
    const startHour = timeStart.getHours();
    const endHour = timeEnd.getHours();

    if (itemName.includes("Snack Siang")) {
      return !(startHour <= 11 || endHour <= 11);
    }
    if (itemName.includes("Makan Siang")) {
      return !(
        (startHour >= 11 && startHour <= 13) ||
        (endHour >= 11 && endHour <= 13) ||
        (startHour <= 11 && endHour >= 13)
      );
    }
    if (itemName.includes("Snack Sore")) {
      return !(startHour >= 13 || endHour >= 13);
    }
    return false;
  };

  const onSubmit = async (data: z.infer<typeof insertReservationSchema>) => {
    const result = await submitReservations(data);

    if (!result.success && result.errors) {
      for (const [key, message] of Object.entries(result.errors)) {
        if (key === "general") {
          form.setError("root", { message });
          toast.error(
            `Something went wrong, ${form.formState.errors.root?.message}`
          );
          console.error(message);
        } else {
          form.setError(key as keyof typeof data, { message });
        }
      }
    } else if (result.success) {
      toast.success("Success");
    }
  };

  function calculateFoodCost(
    foodTypes: string[],
    amountPeople: number
  ): number {
    return foodTypes.reduce((total, item) => {
      if (item.includes("Snack")) {
        return total + 20000 * amountPeople;
      }
      if (item.includes("Makan")) {
        return total + 30000 * amountPeople;
      }
      form.setValue("cost", total);
      return total;
    }, 0);
  }

  useEffect(() => {
    const cost = calculateFoodCost(foodType, amountPeople);
    form.setValue("cost", cost);
  }, [foodType, amountPeople, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h1>Informasi Ruang Meeting</h1>
        <div className="flex gap-4">
          <div className="w-1/4 flex-initial">
            <FormField
              control={form.control}
              name="office"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <Select
                    defaultValue={
                      field.value ? JSON.stringify(field.value) : ""
                    }
                    value={field.value ? JSON.stringify(field.value) : ""}
                    onValueChange={(e) => {
                      const selected = JSON.parse(e);
                      field.onChange(selected);
                      form.setValue("room", null);
                    }}>
                    <FormControl className=" w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {!unitData || unitData.length === 0 ? (
                        <>Terdapat gangguan jaringan...</>
                      ) : (
                        unitData.map((unit) => (
                          <SelectItem
                            key={unit.id}
                            value={JSON.stringify(unit)}>
                            {unit.officeName}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4 flex-initial">
            <FormField
              control={form.control}
              name="room"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ruang Meeting</FormLabel>
                  <Select
                    defaultValue={
                      field.value ? JSON.stringify(field.value) : ""
                    }
                    value={field.value ? JSON.stringify(field.value) : ""}
                    disabled={!selectedUnit || filteredRoomData.length === 0}
                    onValueChange={(val) => {
                      const value: RoomProps = JSON.parse(
                        val
                      ) satisfies RoomProps;
                      field.onChange(value);
                      if (value && value.capacity < amountPeople) {
                        form.setValue("amount", value.capacity);
                      }
                    }}>
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Ruang Meeting" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {!filteredRoomData ? (
                        <>Pilih unit terlebih dahulu</>
                      ) : (
                        filteredRoomData.map((room) => (
                          <SelectItem
                            key={room.id}
                            value={JSON.stringify(room)}>
                            {room.roomName}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="w-1/4 flex-initial">
          <FormField
            name="capacity"
            render={() => (
              <FormItem>
                <FormLabel>Kapasitas</FormLabel>
                <Input
                  type="number"
                  disabled
                  value={selectedRoom ? selectedRoom.capacity : 0}
                />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <h1>Informasi Rapat</h1>

        <div className="flex gap-4">
          <div className="w-1/4 flex-initial">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Rapat</FormLabel>
                  <Popover onOpenChange={setCalendarOpen} open={calendarOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}>
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onDayClick={() => setCalendarOpen(false)}
                        locale={id}
                        onSelect={(e) => {
                          field.onChange(e);
                          form.setValue("timeStart", "");
                          form.setValue("timeEnd", "");
                          form.setValue("foodType", []);
                        }}
                        disabled={(date) => {
                          return date < memoizedToday;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-1/4 flex-initial">
            <FormField
              control={form.control}
              name="timeStart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Waktu Mulai</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(e) => {
                      field.onChange(e);
                      const timeValue = new Date(e);
                      if (selectedEnd) {
                        if (
                          isBefore(timeValue, selectedEnd) ||
                          isEqual(timeValue, selectedEnd)
                        ) {
                          form.setValue("timeEnd", "");
                        }
                      }
                    }}>
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Waktu Mulai" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeOptions.map((time, index) => (
                        <SelectItem
                          key={index}
                          disabled={
                            selectedDate &&
                            selectedDate.toDateString() ===
                              memoizedToday.toDateString() &&
                            new Date().getHours() > time.getHours() - 2
                          }
                          value={time.toISOString()}>
                          {time.getHours()}:00
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4 flex-initial">
            <FormField
              control={form.control}
              name="timeEnd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Waktu Selesai</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!selectedDate || !selectedStart}>
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Waktu Selesai" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem
                          key={time.toISOString()}
                          disabled={isBefore(
                            time,
                            add(selectedStart, { hours: 1 })
                          )}
                          value={time.toISOString()}>
                          {time.getHours()}:00
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="w-1/4 flex-initial">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah Peserta</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    max={selectedRoom ? selectedRoom.capacity : 999}
                    placeholder="Masukkan Jumlah Peserta"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    value={field.value}
                    defaultValue={field.value ?? 0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-1/4 flex-initial">
          <FormField
            control={form.control}
            name="foodType"
            render={() => (
              <FormItem>
                <FormLabel>Jenis Konsumsi</FormLabel>
                {konsumsiData &&
                  konsumsiData
                    .filter(
                      (item) =>
                        item.name.includes("Snack") ||
                        item.name.includes("Makan")
                    )
                    .map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="foodType"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.name)}
                                  disabled={shouldDisableKonsumsiOption(
                                    item.name,
                                    new Date(selectedStart),
                                    new Date(selectedEnd)
                                  )}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.name,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.name
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {item.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
              </FormItem>
            )}
          />
        </div>

        <div className="w-1/4 flex-initial">
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nominal Konsumsi</FormLabel>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center rounded-l-md text-sm   bg-zinc-200">
                    Rp.
                  </div>
                  <FormControl>
                    <Input
                      className="pl-10"
                      type="text"
                      disabled
                      min={0}
                      placeholder="Total harga"
                      value={field.value ? field.value.toLocaleString() : 0}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <Button className="cursor-pointer" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateRoomForm;
