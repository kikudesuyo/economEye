import React from "react";
import { PageName } from "@/util/helper/type";
import SwitchPageButton from "@/util/components/SwitchPageButton";

type Props = {
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};

const Header = ({ setPageName }: Props) => {
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
        <SwitchPageButton
          label="新規登録"
          pageName="Signup"
          setPageName={setPageName}
        />
      </div>
    </header>
  );
};

export default Header;
