import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { PATHS } from "@/utils/constant";
import Main from "@/components/Main";
import Input from "@/components/Input";
import { Auth, isValidEmail, isValidPassword } from "@/pages/auth/helper";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleSignup = async () => {
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
      navigate(PATHS.TOP);
    } catch (error) {
      alert("サインアップに失敗しました。もう一度お試しください。");
      throw new Error("signup failed");
    }
  };
  return (
    <Main style="items-left gap-8 text-left mt-8">
      <h1 className="text-3xl">サインアップ</h1>
      <Input
        type="email"
        label="メールアドレス"
        placeholder="例) economEye@gmail.com"
        containerStyle="flex-col"
        value={email}
        handler={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        label="パスワード(6文字以上)"
        placeholder="パスワードを入力してください"
        containerStyle="flex-col"
        value={password}
        handler={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        label="パスワード確認用"
        placeholder="もう一度パスワードを入力してください"
        containerStyle="flex-col gap-4"
        value={confirmPassword}
        handler={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        label="登録"
        style="w-3/5 mx-auto"
        func={async () => {
          await handleSignup();
        }}
      />
    </Main>
  );
};
export default Signup;
