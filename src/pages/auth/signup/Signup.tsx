import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  authenticate,
  isValidEmail,
  isValidPassword,
} from "@/pages/auth/helper";
import Button from "@/utils/components/Button";
import { PATHS } from "@/utils/helper/constant";
import Main from "@/utils/components/Main";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();
  return (
    <Main style="items-left gap-8 text-left mt-8">
      <h1 className="text-3xl">サインアップ</h1>
      <div className="flex flex-col gap-4">
        <a>メールアドレス</a>
        <input
          className="border-b-2 border-slate-300 outline-none"
          type="email"
          placeholder="例) economEye@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4">
        <a>パスワード(6文字以上)</a>
        <input
          className="border-b-2 border-slate-300 outline-none"
          type="password"
          placeholder="パスワードをを入力してください"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4">
        <a>パスワード確認用</a>
        <input
          className="border-b-2 border-slate-300 outline-none"
          type="password"
          placeholder="もう一度パスワードを入力してください"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <Button
        label="登録"
        style="w-3/5 mx-auto"
        func={async () => {
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
            await authenticate(email, password);
            navigate(PATHS.TOP);
          } catch (error) {
            alert("サインアップに失敗しました。もう一度お試しください。");
            throw new Error("signup failed");
          }
        }}
      />
    </Main>
  );
};
export default Signup;
