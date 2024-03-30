import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewItem } from "@/firebase/functions/functionsHandler";
import Button from "@/utils/components/Button";
import { PATHS } from "@/utils/helper/constant";

const RegisterItem = () => {
  const [janCode, setJanCode] = useState<string>("4901777216884");
  const [itemName, setItemName] = useState<string>("重複テスト");
  const navigate = useNavigate();
  return (
    <div className="items-center w-80 mx-auto">
      <div className="flex flex-col mt-20 gap-8">
        <input
          className="border-b-2 border-slate-300 outline-none"
          type="text"
          placeholder="商品のJANコードを入力してください"
          value={janCode}
          onChange={(e) => setJanCode(e.target.value)}
        />
        <input
          className="border-b-2 border-slate-300 outline-none"
          type="text"
          placeholder="商品名を入力してください"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <Button
          label="登録"
          func={async () => {
            await addNewItem({
              janCode: janCode,
              itemName: itemName,
              condition: "new",
            });
            navigate(PATHS.ITEM_LIST);
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
