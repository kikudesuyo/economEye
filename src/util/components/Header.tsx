import React from "react";
import { Button } from "@/util/components/Button";
import { PageName } from "@/util/helper/type";
import { SwitchPageButton } from "./SwitchPageButton";

type Props = {
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};

export const Header = ({ setPageName }: Props) => {
  return (
    <header className="flex justify-between p-3 border-b border-black">
      <a
        className="flex flex-col justify-center text-xl"
        onClick={() => setPageName("Home")}
      >
        economEye👀
      </a>
      <div className="flex gap-2">
        <SwitchPageButton
          label="ログイン"
          pageName="Login"
          setPageName={setPageName}
        />
        <Button label="新規登録" />
      </div>
    </header>
  );
};
