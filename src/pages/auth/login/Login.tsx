import { useState } from "react";
import Button from "@/utils/components/Button";
import { PageName } from "@/utils/helper/type";
import { login } from "@/pages/auth/helper";
import padlock from "@/imgs/padlock.jpg";

type Props = {
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};

const Login = ({ setPageName }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
          try {
            await login(email, password);
            setPageName("Top");
          } catch (error) {
            throw new Error("login failed");
          }
        }}
      />
    </div>
  );
};
export default Login;
