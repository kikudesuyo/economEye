import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewItem } from "@/firebase/functions/functionsHandler";
import Button from "@/components/Button";
import { PATHS } from "@/utils/constant";
import Main from "@/components/Main";
import Input from "@/components/Input";

const RegisterItem = () => {
  const [janCode, setJanCode] = useState<string>("4901777216884");
  const [itemName, setItemName] = useState<string>("重複テスト");
  const navigate = useNavigate();
  return (
    <Main>
      <div className="mt-20 flex flex-col gap-8">
        <Input
          type="text"
          label="JANコード"
          placeholder="商品のJANコードを入力してください"
          style="flex-col w-3/5 mx-auto"
          value={janCode}
          handler={(e) => setJanCode(e.target.value)}
        />
        <Input
          type="text"
          label="商品名"
          placeholder="商品名を入力してください"
          style="flex-col w-3/5 mx-auto"
          value={itemName}
          handler={(e) => setItemName(e.target.value)}
        />
        <Button
          label="登録"
          style="w-3/5 mx-auto"
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
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">JANコードとは</h1>
        <ul className="flex list-disc flex-col gap-4 pl-5">
          <li className="text-gray-800">
            商品につけられた13桁の番号のことです。
          </li>
          <li className="text-gray-800">
            登録したい番号が分からない場合はWebサイトで検索してください。
          </li>
        </ul>
      </div>
    </Main>
  );
};

export default RegisterItem;
