const getJapanTime = (): Date => {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset();
  const japanTimezoneOffset = timezoneOffset + (9 * 60);
  const japanTime = new Date(now.getTime() + (japanTimezoneOffset * 60000));
  return japanTime
}

export const today = (): string => {
  const date = getJapanTime();
  const year = String(date.getFullYear()).padStart(4, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};
