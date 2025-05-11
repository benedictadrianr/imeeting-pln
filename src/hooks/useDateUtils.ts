import { startOfDay } from "date-fns";
import { useMemo } from "react";
import { generateTimeOptions } from "./generateTimeOptions";

export const useDateUtils = (selectedDate: Date | null) => {
  const memoizedToday = useMemo(() => startOfDay(new Date()), []);

  const timeOptions = useMemo(() => {
    return selectedDate ? generateTimeOptions(selectedDate) : [];
  }, [selectedDate]);

  return { memoizedToday, timeOptions };
};
