import { format } from "@formkit/tempo";

const getJapanTime = (): Date => {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset();
  const japanTimezoneOffset = timezoneOffset + 9 * 60;
  const japanTime = new Date(now.getTime() + japanTimezoneOffset * 60000);
  return japanTime;
};

export const today = (): string => {
  const jpDate = getJapanTime();
  return format(jpDate, "YYYY/MM/DD");
};
