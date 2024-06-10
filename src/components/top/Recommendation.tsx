import { useEffect, useState } from "react";
import { fetchUserItems } from "@/firebase/firestore/item";
import { UserItemData } from "@/utils/type";
import { calcAverage } from "@/calculation/calcValue";
import {
  getPriceArray,
  getPriceValueOnDate,
} from "@/firebase/firestore/dbFetcher";
import { today } from "@/utils/timeUtils";
import DiffFromAverage from "@/pages/item/DiffFromAverage";

const Recommendation = () => {
  const [ItemData, setItemData] = useState<UserItemData[]>([]);
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
  );
};

export default Recommendation;
