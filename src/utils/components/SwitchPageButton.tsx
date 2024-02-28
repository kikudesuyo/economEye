import React from "react";
import { PageName } from "@/utils/helper/type";
import Button from "@/utils/components/Button";

type Props = {
  label: string;
  pageName: PageName;
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};

const SwitchPageButton = ({ label, pageName, setPageName }: Props) => {
  return <Button label={label} func={() => setPageName(pageName)} />;
};

export default SwitchPageButton;
