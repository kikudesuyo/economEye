import SwitchPageButton from "@/utils/components/SwitchPageButton";
import React from "react";
import { PageName } from "@/utils/helper/type";

type Props = {
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};
const Signup = ({ setPageName }: Props) => {
  return (
    <div className="flex flex-col items-left w-80 mx-auto gap-8 py-8 text-left">
      <h1 className="text-3xl">サインアップ</h1>
      <div className="flex flex-col gap-4">
        <a>メールアドレス</a>
        <input
          className="border-b-2 border-slate-300 outline-none"
          type="email"
          placeholder="例) economEye@gmail.com"
        />
      </div>
      <div className="flex flex-col gap-4">
        <a>パスワード(8文字以上)</a>
        <input
          className="border-b-2 border-slate-300 outline-none"
          type="password"
          placeholder="パスワードをを入力してください"
        />
      </div>
      <div className="flex flex-col gap-4">
        <a>パスワード確認用</a>
        <input
          className="border-b-2 border-slate-300 outline-none"
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
