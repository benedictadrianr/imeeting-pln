import { isBefore } from "date-fns";
import { z } from "zod";

export const roomOrderSchema = z
  .object({
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
      .optional(),

    date: z.date({ required_error: "Wajib memilih tanggal." }),

    timeStart: z
      .string({ required_error: "Wajib memilih waktu mulai." })
      .datetime({ precision: 3 }),

    timeEnd: z
      .string({ required_error: "Wajib memilih waktu selesai." })
      .datetime({ precision: 3 }),

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
      .gt(0, { message: "Wajib menentukan total harga." }),
  })
  .refine(
    (data) =>
      data.office &&
      data.room &&
      data.date &&
      data.timeStart &&
      data.timeEnd &&
      data.amount &&
      data.cost,
    { message: "Terdapat form wajib yang belum terisi." }
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
