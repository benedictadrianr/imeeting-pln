export const generateTimeOptions = (date: Date) => {
  return Array.from(
    { length: 24 },
    (_, i) =>
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), i, 0, 0, 0)
  );
};
