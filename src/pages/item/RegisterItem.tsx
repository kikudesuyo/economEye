import Button from "@/utils/components/Button";
import { PageName } from "@/utils/helper/type";
import React from "react";
import itemPrice from "@/pages/item/helper";

type Props = {
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};
const RegisterItem = ({ setPageName }: Props) => {
  const [janCode, setJanCode] = React.useState<string>("");
  return (
    <div className="items-center w-80 mx-auto">
      <div className="flex flex-col pt-8 gap-4">
        <input
          className="border-2  px-4 py-3 text-center"
          type="text"
          placeholder="商品のJANコードを入力してください"
          value={janCode}
          onChange={(e) => setJanCode(e.target.value)}
        />
        <Button
          label="登録"
          func={() => {
            itemPrice(janCode);
            setPageName("ItemList");
          }}
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
