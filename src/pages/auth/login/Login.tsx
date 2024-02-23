import React from "react";
import { PageName } from "@/utils/helper/type";
import LoginButton from "@/pages/auth/login/LoginButton";

type Props = {
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};

const Login = ({ setPageName }: Props) => {
  const [email, setEmail] = React.useState<string>("koya@koya.com");
  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <div>
        <p>メールアドレス</p>
        <input
          type="email"
          placeholder="メールアドレスを入力してください"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <p>パスワード</p>
        <input type="password" placeholder="パスワードを入力してください" />
      </div>
      <LoginButton setPageName={setPageName} email={email} />
    </div>
  );
};
export default Login;
