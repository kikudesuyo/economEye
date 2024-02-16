import React from "react";
import { PageName } from "@/util/helper/type";

type Props = {
  label: string;
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};

export const LoginButton = ({ label, setPageName }: Props) => {
  return (
    <button
      onClick={() => setPageName("Login")}
      className="bg-slate-300 px-4 py-3 rounded-xl"
    >
      {label}
    </button>
  );
};
