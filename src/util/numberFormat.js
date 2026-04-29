export const addThousandSeparator = (value) => {
  if (value === null || value === undefined) return "0";
  return Number(value).toLocaleString("en-IN");
};
