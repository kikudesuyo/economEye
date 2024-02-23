import React from "react";
import { PageName } from "@/utils/helper/type";
import { authenticate } from "@/pages/auth/helper";

type Props = {
  email: string;
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};

const LoginButton = ({ email, setPageName }: Props) => {
  const handleClick = () => {
    if (authenticate(email)) {
      setPageName("Top");
    } else {
      alert("メールアドレスををeconomEye@gmail.comにして");
    }
  };
  return (
    <button
      className="bg-slate-300 px-4 py-3 rounded-xl text-center"
      onClick={() => handleClick()}
    >
      ログイン
    </button>
  );
};
export default LoginButton;
