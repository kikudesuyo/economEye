import { format } from "@formkit/tempo";

export const today = (): string => {
  const date = new Date();
  return format(date, "YYYY/MM/DD");
};

export const formatDate = (dateString: string) => {
  const dateObj = new Date(dateString);
  return format(dateObj, "MM/DD");
};
