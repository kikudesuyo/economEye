import { isValidEmail, isValidPassword, Auth } from "@/auth";

export const validateLogin = async (email: string, password: string) => {
  if (!isValidEmail(email)) {
    alert("正しいメールアドレスを入力してください。");
    throw new Error("invalid email");
  }
  if (!isValidPassword(password)) {
    alert("パスワードは6文字以上で入力してください。");
    throw new Error("invalid password");
  }
  const auth = new Auth();
  await auth.login(email, password).catch(() => {
    alert("ログインに失敗しました。もう一度お試しください。");
    throw new Error("login failed");
  });
};

export const validateSignup = async (
  email: string,
  password: string,
  confirmPassword: string
) => {
  if (!isValidEmail(email)) {
    alert("正しいメールアドレスを入力してください。");
    throw new Error("invalid email");
  }
  if (!isValidPassword(password)) {
    alert("パスワードは6文字以上で入力してください。");
    throw new Error("invalid password");
  }
  if (password !== confirmPassword) {
    alert("パスワードが一致しません。もう一度入力してください。");
    throw new Error("password does not match");
  }
  try {
    const auth = new Auth();
    await auth.signup(email, password);
  } catch (error) {
    alert("サインアップに失敗しました。もう一度お試しください。");
    throw new Error("signup failed");
  }
};
