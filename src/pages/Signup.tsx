import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { PATHS } from "@/utils/constant";
import Main from "@/components/Main";
import Input from "@/components/Input";
import { validateSignup } from "@/auth/authHandling";
import signupLogo from "@/assets/imgs/signup.svg";
import padlock from "@/assets/imgs/padlock.svg";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleSignup = async () => {
    await validateSignup(email, password, confirmPassword);
    navigate(PATHS.TOP);
  };
  return (
    <Main style="gap-4 md:gap-8 mt-8">
      <div className="flex flex-row items-center justify-center gap-4">
        <img src={padlock} alt="" className="w-6 md:w-10" />
        <h1 className="text-center text-xl font-bold md:text-3xl">新規登録</h1>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex w-full justify-center">
          <img src={signupLogo} className="h-auto w-full max-w-md" />
        </div>
        <div className="flex justify-center">
          <div className="flex w-full flex-col  justify-center gap-8 md:w-3/5">
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
                  label="パスワード(6文字以上)"
                  placeholder="パスワードを入力してください"
                  style="flex-col"
                  value={password}
                  handler={(e) => setPassword(e.target.value)}
                />
                <Input
                  type="password"
                  label="パスワード確認用"
                  placeholder="もう一度パスワードを入力してください"
                  style="flex-col gap-4"
                  value={confirmPassword}
                  handler={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <Button
              label="登録"
              style="w-3/5 mx-auto"
              func={async () => {
                await handleSignup();
              }}
            />
          </div>
        </div>
      </div>
    </Main>
  );
};
export default Signup;