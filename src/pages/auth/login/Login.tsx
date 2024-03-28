import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/utils/components/Button";
import { login, isValidEmail, isValidPassword } from "@/pages/auth/helper";
import padlock from "@/imgs/padlock.jpg";

const Login = () => {
  const [email, setEmail] = useState<string>("hogehoge@gmail.com");
  const [password, setPassword] = useState<string>("hogehoge");
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-left w-80 mx-auto gap-8 py-8 text-left">
      <div className="flex flex-row items-center">
        <img className="w-14 h-14" src={padlock} alt="" />
        <h1 className="text-3xl">ログイン</h1>
      </div>
      <div className="flex flex-col gap-4">
        <p>メールアドレス</p>
        <input
          className="border-b-2 border-slate-300 outline-none"
          type="email"
          placeholder="例) economEye@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4">
        <p>パスワード(6文字以上)</p>
        <input
          className="border-b-2 border-slate-300 outline-none"
          type="password"
          placeholder="パスワードを入力してください"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        label="ログイン"
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
            navigate("/top");
          } catch (error) {
            alert("ログインに失敗しました。もう一度お試しください。");
            throw new Error("login failed");
          }
        }}
      />
    </div>
  );
};
export default Login;
