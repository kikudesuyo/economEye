import React from "react";
import { PageName } from "@/util/helper/type";
import { authenticate } from "@/pages/Auth/helper";

type Props = {
  email: string;
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};

const LoginButton = ({ email, setPageName }: Props) => {
  const handleClick = () => {
    if (authenticate(email)) {
      setPageName("Top");
    } else {
      alert("メールアドレスををkoya@koya.comにして");
    }
  };
  return (
    <button
      className="bg-slate-300 px-4 py-3 rounded-xl"
      onClick={() => handleClick()}
    >
      ログイン
    </button>
  );
};
export default LoginButton;
