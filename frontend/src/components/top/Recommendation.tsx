import { useEffect, useState } from "react";

import { useAuth } from "@/contexts/useAuth";
import { displayPriceDiffMessage } from "@/pages/item/priceDiffMessage";

import { getAuthUserItemData } from "@/data/localStorage/item/authUserItemData";
import { getGuestItemData } from "@/data/localStorage/item/guestItemData";

import {
  getPriceArray,
  getPriceValueOnDate,
} from "@/pages/item/priceDataFormatter";
import { formatAverage } from "@/pages/item/calcValue";
import { UserItemData } from "@/utils/types/items";
import { today } from "@/utils/timeUtils";

const Recommendation = () => {
  const { isAuthenticated, loading } = useAuth();
  const [ItemData, setItemData] = useState<UserItemData[]>([]);
  useEffect(() => {
    if (!loading) {
      (async () => {
        try {
          const itemData = isAuthenticated
            ? await getAuthUserItemData()
            : getGuestItemData();
          setItemData(itemData);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [isAuthenticated, loading]);

  const isExistUserItem = () => {
    return ItemData.length > 0;
  };

  const recommendedItems = () => {
    const recommendedItems = ItemData.filter((item: UserItemData) => {
      const averageValue = formatAverage(getPriceArray(item));
      const todayValue = getPriceValueOnDate(item, today());
      if (todayValue === null) {
        return false;
      }
      return todayValue < averageValue;
    });
    return recommendedItems;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center text-2xl font-bold">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">おすすめ</h2>
      <div className="flex flex-col gap-4 rounded-sm border-2 border-gray-300 p-5 shadow-md">
        {!isExistUserItem() && (
          <div className="flex flex-col items-center">
            <p>商品が登録されていません。</p>
            <p>商品登録ページで登録しましょう!</p>
          </div>
        )}
        {isExistUserItem() && recommendedItems().length === 0 && (
          <div className="flex flex-col items-center gap-4">
            <p>おすすめ商品はありません</p>
            <p>商品登録をして安くなるまで待ちましょう</p>
          </div>
        )}
        {recommendedItems().map((item: UserItemData, index: number) => {
          return (
            <div key={index} className="flex justify-center gap-8">
              <p>{item.itemName}</p>
              <p>
                {displayPriceDiffMessage({
                  prices: getPriceArray(item),
                  price: getPriceValueOnDate(item, today()),
                })}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recommendation;
