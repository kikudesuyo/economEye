import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/useAuth";
import Button from "@/components/Button";
import Main from "@/components/Main";
import Input from "@/components/Input";
import { validateLogin, validateAnonymousLogin } from "@/auth/authHandling";
import { PATHS } from "@/utils/constant";
import loginLogo from "@/assets/imgs/login.svg";
import padlock from "@/assets/imgs/padlock.svg";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async () => {
    await validateLogin(email, password);
    login();
    navigate(PATHS.TOP);
  };
  const handleAnonymousLogin = async () => {
    await validateAnonymousLogin();
    login();
    navigate(PATHS.TOP);
  };
  return (
    <Main style="gap-4 md:gap-8 mt-8">
      <div className="flex flex-row items-center justify-center gap-4">
        <img src={padlock} alt="" className="w-6 md:w-10" />
        <h1 className="text-center text-xl font-bold md:text-3xl">ログイン</h1>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-center">
          <img src={loginLogo} className="w-full max-w-md" />
        </div>
        <div className="flex justify-center">
          <div className="w-full  gap-8  md:w-3/5">
            <div className="rounded-lg border border-gray-300 bg-neutral-50 p-4 shadow-lg">
              <div className="flex flex-col gap-8 text-left">
                <Input
                  type="email"
                  label="メールアドレス"
                  placeholder="例) economEye@gmail.com"
                  style="flex-col "
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
          </div>
        </div>
      </div>
      <Button
        label="ログイン"
        style="w-3/5 mx-auto text-xl"
        func={async () => {
          await handleLogin();
        }}
      />
      <div className="mx-auto flex w-3/5 flex-col items-center justify-center gap-8">
        <div className="flex w-full items-center">
          <span className="grow border-t-4 "></span>
          <span className="relative px-2 text-xl">または</span>
          <span className="grow border-t-4 "></span>
        </div>
        <button>
          <span
            className="cursor-pointer text-xl text-gray-500 underline"
            onClick={async () => {
              await handleAnonymousLogin();
            }}
          >
            ゲストとしてログイン
          </span>
        </button>
      </div>
    </Main>
  );
};
export default Login;
