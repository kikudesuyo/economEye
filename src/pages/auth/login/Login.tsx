import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { login, isValidEmail, isValidPassword } from "@/pages/auth/helper";
import { PATHS } from "@/utils/constant";
import padlock from "@/assets/imgs/padlock.svg";
import Main from "@/components/Main";
import Input from "@/components/Input";

const Login = () => {
  const [email, setEmail] = useState<string>("hogehoge@gmail.com");
  const [password, setPassword] = useState<string>("hogehoge");
  const navigate = useNavigate();
  return (
    <Main style="gap-8 mt-8">
      <div className="flex flex-row items-center">
        <img className="w-14 h-14" src={padlock} alt="" />
        <h1 className="text-3xl">ログイン</h1>
      </div>
      <Input
        type="email"
        label="メールアドレス"
        placeholder="例) economEye@gmail.com"
        value={email}
        handler={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        label="パスワード"
        placeholder="パスワードを入力してください"
        value={password}
        handler={(e) => setPassword(e.target.value)}
      />
      <Button
        label="ログイン"
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
          try {
            await login(email, password);
            navigate(PATHS.TOP);
          } catch (error) {
            alert("ログインに失敗しました。もう一度お試しください。");
            throw new Error("login failed");
          }
        }}
      />
    </Main>
  );
};
export default Login;
