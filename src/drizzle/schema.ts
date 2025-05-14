import { isBefore } from "date-fns";
import {
  date,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const ReservationTable = pgTable("reservations", {
  id: integer().generatedAlwaysAsIdentity().primaryKey().notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  username: text(),
  office: jsonb().notNull(),
  room: jsonb().notNull(),
  date: date({ mode: "date" }).notNull(),
  timeStart: timestamp({ withTimezone: true, mode: "string" }),
  timeEnd: timestamp({ withTimezone: true, mode: "string" }),
  amount: integer().notNull(),
  foodType: text().array(),
  cost: integer(),
});

export const selectReservationSchema = createSelectSchema(ReservationTable, {
  office: z.object(
    {
      id: z.string(),
      officeName: z.string(),
    },
    { required_error: "Wajib memilih salah satu unit." }
  ),

  room: z
    .object(
      {
        id: z.string(),
        roomName: z.string(),
        officeId: z.string(),
        officeName: z.string(),
        capacity: z.number(),
      },
      { required_error: "Wajib memilih salah satu ruangan." }
    )
    .nullable(),

  date: z.date({ required_error: "Wajib memilih tanggal." }),

  timeStart: z
    .string({ required_error: "Wajib memilih waktu mulai." })
    .datetime({ precision: 3, local: true }),

  timeEnd: z
    .string({ required_error: "Wajib memilih waktu selesai." })
    .datetime({ precision: 3, local: true }),

  amount: z
    .number({
      required_error: "Wajib menentukan jumlah peserta",
      invalid_type_error: "Wajib menentukan jumlah peserta",
    })
    .gt(0, { message: "Wajib menentukan jumlah peserta." }),

  foodType: z.array(z.string()),

  cost: z
    .number({
      required_error: "Wajib menentukan total harga.",
      invalid_type_error: "Wajib menentukan total harga.",
    })
    .gte(0, { message: "Wajib menentukan total harga." }),
});

export const insertReservationSchema = createInsertSchema(ReservationTable, {
  office: z.object(
    {
      id: z.string(),
      officeName: z.string(),
    },
    { required_error: "Wajib memilih salah satu unit." }
  ),

  room: z
    .object(
      {
        id: z.string(),
        roomName: z.string(),
        officeId: z.string(),
        officeName: z.string(),
        capacity: z.number(),
      },
      { required_error: "Wajib memilih salah satu ruangan." }
    )
    .nullable(),

  date: z.date({ required_error: "Wajib memilih tanggal." }),

  timeStart: z
    .string({ required_error: "Wajib memilih waktu mulai." })
    .datetime({ precision: 3, local: true }),

  timeEnd: z
    .string({ required_error: "Wajib memilih waktu selesai." })
    .datetime({ precision: 3, local: true }),

  amount: z
    .number({
      required_error: "Wajib menentukan jumlah peserta",
      invalid_type_error: "Wajib menentukan jumlah peserta",
    })
    .gt(0, { message: "Wajib menentukan jumlah peserta." }),

  foodType: z.array(z.string()),

  cost: z.number({
    invalid_type_error: "Wajib menentukan total harga.",
  }),
})
  .refine(
    (data) =>
      data.office &&
      data.room &&
      data.date &&
      data.timeStart &&
      data.timeEnd &&
      data.amount && {
        message: "Terdapat form wajib yang belum terisi.",
        path: ["general"],
      }
  )
  .refine((data) => data.room && data.room.capacity >= data.amount, {
    message: "Jumlah peserta tidak boleh melebihi kapasitas ruangan",
    path: ["amount"],
  })
  .refine(
    (data) =>
      new Date(data.timeStart) instanceof Date &&
      new Date(data.timeEnd) instanceof Date &&
      isBefore(data.timeStart, data.timeEnd),
    {
      message: "Waktu selesai tidak boleh sebelum waktu mulai",
      path: ["timeEnd"],
    }
  );
