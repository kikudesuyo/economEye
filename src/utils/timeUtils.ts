import { format } from "@formkit/tempo";

export const today = (): string => {
  const date = new Date();
  return format(date, "YYYY/MM/DD");
};

export const formatDate = (dateString: string) => {
  const dateObj = new Date(dateString);
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${month}/${day}`;
};
