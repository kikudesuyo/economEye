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
          placeholder="商品のJANコードを入力してください"
        />
        <SwitchPageButton
          label="登録"
          pageName="ItemList"
          setPageName={setPageName}
        />
      </div>
      <div className="flex flex-col pt-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">JANコードとは</h1>
          <ul className="list-disc pl-5 flex flex-col gap-4">
            <li className="text-gray-800">
              商品につけられた13桁の番号のことです。
            </li>
            <li className="text-gray-800">
              登録したい番号が分からない場合はWebサイトで検索してください。
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RegisterItem;
