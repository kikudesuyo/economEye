import SwitchPageButton from "@/utils/components/SwitchPageButton";
import { PageName } from "@/utils/helper/type";
import React from "react";

type Props = {
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};
const RegisterItem = ({ setPageName }: Props) => {
  return (
    <div className="items-center w-80 mx-auto">
      <div className="flex flex-col pt-8 gap-4">
        <input
          className="border-2  px-4 py-3 text-center"
          type="text"
          placeholder="商品のURLを入力してください"
        />
        <SwitchPageButton
          label="登録"
          pageName="ItemList"
          setPageName={setPageName}
        />
      </div>
    </div>
  );
};

export default RegisterItem;
