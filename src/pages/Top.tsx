import { useState, useEffect } from "react";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
import {
  fetchUserItems,
  getValueForDate,
  getPriceArray,
} from "@/firebase/firestore/dbFetcher";
import { calcAverage } from "@/analysis/isOptimalValue";
import { PATHS } from "@/utils/constant";
import { today } from "@/utils/timeUtils";
import Main from "@/components/Main";
import { UserItemData } from "@/utils/type";

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

  const recommendedItems = () => {
    const recommendedItems = ItemData.filter((item: UserItemData) => {
      const averageValue = calcAverage(getPriceArray(item));
      const todayValue = getValueForDate(item, today());
      if (todayValue === null) {
        return false;
      }
      return averageValue > todayValue;
    });
    return recommendedItems;
  };

  return (
    <Main style="mt-4">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">お知らせ</h1>
          <div className="p-5 grid grid-cols-1 gap-4 border-2">
            <ul className="list-disc pl-5 flex flex-col gap-4">
              <li>2024年3月21日 プレリリース</li>
              <li>2024年4月01日 スタイルの修正</li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">おすすめ</h2>
          <div className="flex flex-col border-2 p-5 gap-2">
            {recommendedItems().length === 0 && (
              <div className="flex flex-col text-center gap-4">
                <p>おすすめ商品はありません</p>
                <p>商品登録をして安くなるまで待ちましょう</p>
              </div>
            )}
            {recommendedItems().map((item: UserItemData, index: number) => {
              return (
                <div key={index} className="flex justify-between">
                  <p>{item.itemName}</p>
                  <p>いつもより500円安い</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col mt-14 gap-6">
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
