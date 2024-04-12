import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchUserItems,
  getPriceValueOnDate,
  getPriceArray,
} from "@/firebase/firestore/dbFetcher";
import { calcAverage } from "@/calculation/calcValue";
import { PATHS } from "@/utils/constant";
import { today } from "@/utils/timeUtils";
import { UserItemData } from "@/utils/type";
import Button from "@/components/Button";
import Main from "@/components/Main";
import DiffFromAverage from "@/pages/item/DiffFromAverage";

const Top = () => {
  const [ItemData, setItemData] = useState<UserItemData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchUserItems();
        setItemData(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const isExistUserItem = () => {
    return ItemData.length > 0;
  };

  const recommendedItems = () => {
    const recommendedItems = ItemData.filter((item: UserItemData) => {
      const averageValue = calcAverage(getPriceArray(item));
      const todayValue = getPriceValueOnDate(item, today());
      if (todayValue === null) {
        return false;
      }
      return todayValue < averageValue;
    });
    return recommendedItems;
  };

  return (
    <Main style="mt-4">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold">おすすめ</h2>
          <div className="flex flex-col gap-2 border-2 p-5">
            {!isExistUserItem() && (
              <div className="flex flex-col text-center">
                <p>商品が登録されていません。</p>
                <p>商品登録ページで登録しましょう!</p>
              </div>
            )}
            {isExistUserItem() && recommendedItems().length === 0 && (
              <div className="flex flex-col gap-4 text-center">
                <p>おすすめ商品はありません</p>
                <p>商品登録をして安くなるまで待ちましょう</p>
              </div>
            )}
            {recommendedItems().map((item: UserItemData, index: number) => {
              return (
                <div key={index} className="flex justify-center gap-8">
                  <p>{item.itemName}</p>
                  <DiffFromAverage
                    prices={getPriceArray(item)}
                    price={getPriceValueOnDate(item, today())}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">お知らせ</h1>
          <div className="grid grid-cols-1 gap-4 border-2 p-5">
            <ul className="flex list-disc flex-col gap-4 pl-5">
              <li>2024年3月21日 プレリリース</li>
              <li>2024年4月01日 スタイルの修正</li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-6">
          <Button
            label="商品登録ページ"
            style="w-3/5 mx-auto"
            func={() => {
              navigate(PATHS.REGISTER_ITEM);
            }}
          />
          <Button
            label="商品一覧ページ"
            style="w-3/5 mx-auto"
            func={() => {
              navigate(PATHS.ITEM_LIST);
            }}
          />
        </div>
      </div>
    </Main>
  );
};

export default Top;
