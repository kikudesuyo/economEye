import SwitchPageButton from "@/utils/components/SwitchPageButton";
import React from "react";
import { PageName } from "@/utils/helper/type";

type Props = {
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};
const Signup = ({ setPageName }: Props) => {
  return (
    <div>
      <div>
        <a>メールアドレス</a>
        <input type="text" placeholder="メールアドレス入れて" />
      </div>
      <div>
        <a>パスワード</a>
        <input type="text" placeholder="パスワードを入れて" />
      </div>
      <div>
        <a>パスワード確認用</a>
        <input type="text" placeholder="パスワード入れて" />
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
