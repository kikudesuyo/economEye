import React from "react";
import { PageName } from "@/util/helper/type";

type Props = {
  label: string;
  pageName: PageName;
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};

const SwitchPageButton = ({ label, pageName, setPageName }: Props) => {
  return (
    <button
      onClick={() => setPageName(pageName)}
      className="bg-slate-300 px-4 py-3 rounded-xl"
    >
      {label}
    </button>
  );
};

export default SwitchPageButton;
