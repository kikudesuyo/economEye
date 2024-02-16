import React from "react";
import { PageName } from "@/util/helper/type";
import { LoginButton } from "@/pages/Login/LoginButton";

type Props = {
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};

export const Login = ({ setPageName }: Props) => {
  const [email, setEmail] = React.useState<string>("koya@koya.com");
  return (
    <div className="flex flex-col items-center gap-8 pt-3 ">
      <div>
        <p>メールアドレス</p>
        <input
          type="text"
          placeholder="メールアドレスを入力してください"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <p>パスワード</p>
        <input type="text" placeholder="パスワードを入力してください" />
      </div>
      <LoginButton setPageName={setPageName} email={email} />
    </div>
  );
};
