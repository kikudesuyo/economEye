import React from "react";
import { Container } from "@/util/components/Container";
import { PageName } from "@/util/helper/type";

type Props = {
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};

export const Login = ({ setPageName }: Props) => {
  return (
    <Container
      setPageName={setPageName}
      child={
        <div className="flex flex-col items-center gap-8 pt-3 ">
          <div>
            <p>メールアドレス</p>
            <input type="text" placeholder="メールアドレスを入力してください" />
          </div>
          <div>
            <p>パスワード</p>
            <input type="text" placeholder="パスワードを入力してください" />
          </div>
        </div>
      }
    />
  );
};
