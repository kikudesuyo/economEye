import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { PATHS } from "@/utils/constant";
import Main from "@/components/Main";
import Input from "@/components/Input";
import { isValidEmail, isValidPassword, Auth } from "@/pages/auth/helper";
import loginLogo from "@/assets/imgs/login.svg";
import padlock from "@/assets/imgs/padlock.svg";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleLogin = async () => {
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
    navigate(PATHS.TOP);
  };
  return (
    <Main style="gap-8 mt-8">
      <div className="flex flex-row items-center justify-center gap-4">
        <img src={padlock} alt="" className="h-auto w-10" />
        <h1 className="text-center text-3xl font-bold">ログイン</h1>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex w-full justify-center ">
          <img src={loginLogo} className="h-auto w-full max-w-md" />
        </div>
        <div className="flex justify-center">
          <div className="flex w-full flex-col gap-8  md:w-3/5">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="flex flex-col gap-8 text-left">
                <Input
                  type="email"
                  label="メールアドレス"
                  placeholder="例) economEye@gmail.com"
                  style="flex-col"
                  value={email}
                  handler={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  label="パスワード"
                  placeholder="パスワードを入力してください"
                  style="flex-col"
                  value={password}
                  handler={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button
              label="ログイン"
              style="w-3/5 mx-auto"
              func={async () => {
                await handleLogin();
              }}
            />
          </div>
        </div>
      </div>
    </Main>
  );
};
export default Login;
