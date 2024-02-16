import React from "react";
import { Button } from "@/util/components/Button";
import { LoginButton } from "@/pages/Login/LoginButton";
import { PageName } from "@/util/helper/type";

type Props = {
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};

export const Header = ({ setPageName }: Props) => {
  return (
    <header className="flex justify-between p-3 border-b border-black">
      <a
        className="flex flex-col justify-center text-xl"
        onClick={() => setPageName("Top")}
      >
        economEye👀
      </a>
      <div className="flex gap-2">
        <LoginButton label="ログイン" setPageName={setPageName} />
        <Button label="新規登録" />
      </div>
    </header>
  );
};
