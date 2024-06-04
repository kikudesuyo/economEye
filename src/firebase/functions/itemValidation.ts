export const isValidName = (input: string): boolean => {
  return input.length > 0;
};

export const isValidJanCode = (input: string): boolean => {
  const regex = /^\d{13}$/;
  return regex.test(input);
};
