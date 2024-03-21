import { useEffect, useState } from "react";
import Button from "@/utils/components/Button";
import { fetchUserItems } from "@/pages/item/helper/dbFetcher";
import { updateItem } from "@/pages/item/helper/functionsHandler";
import { NumberOrNull, PageName } from "@/utils/helper/type";
import { today } from "@/pages/item/helper/timeUtils";
import { ItemDb } from "@/utils/helper/type";
import { getValueForDate, getPriceArray } from "@/pages/item/helper/dbFetcher";
import { calcAverage, displayPriceDiffFromAverage } from "@/analysis/isOptimalValue";

type Props = {
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};

const ItemList = ({ setPageName }: Props) => {
  const [dbData, setDbData] = useState<any>(null);
  useEffect(() => {
    (async () => {
      try {
        // const data = await fetchData();
        const data = await fetchUserItems();
        setDbData(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div>
      <div className="w-9/12 mx-auto flex flex-wrap mt-4justify-start">
        {dbData &&
          dbData.map((item: ItemDb, index: number) => (
            <div
              key={index}
              className="flex flex-col flex-shrink-0 items-center p-3 border-2 border-slate-300 m-2 gap-2 "
              style={{ width: "80px", height: "200px" }}
            >
              <img src={item.imageId} alt="" />
              <p>{item.itemName}</p>
              <p>{getValueForDate(item, today())}円</p>
              <p>{displayPriceDiffFromAverage(getPriceArray(item),getValueForDate(item,today()))}</p>
            </div>
          ))}
      </div>
      <Button
        label="商品データの更新"
        func={() => {
          updateItem();
        }}
      />
      <Button
        label="データ参照"
        func={() => {
          const prices = getPriceArray(dbData[0]);
          const todayPrice: NumberOrNull = getValueForDate(dbData[0], today());
          console.log("今までの価格"+prices);
          console.log("今日の価格"+todayPrice);
          console.log("平均価格"+calcAverage(prices));
          const result = displayPriceDiffFromAverage(prices, todayPrice);
          console.log(result);
        }}
      />
      <Button
        label="トップページに戻る"
        func={() => {
          setPageName("Top");
        }}
      />
    </div>
  );
};

export default ItemList;
