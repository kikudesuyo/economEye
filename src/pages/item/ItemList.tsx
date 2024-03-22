import { useEffect, useState } from "react";
import Button from "@/utils/components/Button";
import { fetchUserItems, getValueForDate, getPriceArray } from "@/firebase/firestore/dbFetcher";
import { updateItem } from "@/firebase/functions/functionsHandler";
import { ClientItemDb, PageName } from "@/utils/helper/type";
import { today } from "@/pages/item/helper/timeUtils";
import { displayPriceDiffFromAverage } from "@/analysis/isOptimalValue";

type Props = {
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};

const ItemList = ({ setPageName }: Props) => {
  const [dbData, setDbData] = useState<any>(null);
  useEffect(() => {
    (async () => {
      try {
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
          dbData.map((item: ClientItemDb, index: number) => (
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
        label="トップページに戻る"
        func={() => {
          setPageName("Top");
        }}
      />
    </div>
  );
};

export default ItemList;
