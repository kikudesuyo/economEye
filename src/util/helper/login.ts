export const authenticate = (email: string) => {
  if (email === "koya@koya.com") {
    return true;
  } else {
    return false;
  }
};
