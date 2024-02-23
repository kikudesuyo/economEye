import SwitchPageButton from "@/utils/components/SwitchPageButton";
import React from "react";
import { PageName } from "@/utils/helper/type";

type Props = {
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};
const Signup = ({ setPageName }: Props) => {
  return (
    <div className="flex flex-col w-80 gap-8 py-8 text-center mx-auto">
      <div className="flex flex-col gap-4">
        <a>メールアドレス</a>
        <input
          className="border-2 border-slate-300"
          type="email"
          placeholder="メールアドレスを入力してください"
        />
      </div>
      <div className="flex flex-col gap-4">
        <a>パスワード</a>
        <input
          className="border-2 border-slate-300"
          type="password"
          placeholder="パスワードをを入力してください"
        />
      </div>
      <div className="flex flex-col gap-4">
        <a>パスワード確認用</a>
        <input
          className="border-2 border-slate-300"
          type="password"
          placeholder="もう一度パスワードを入力してください"
        />
      </div>
      <SwitchPageButton
        label="登録"
        pageName="Login"
        setPageName={setPageName}
      />
    </div>
  );
};
export default Signup;
