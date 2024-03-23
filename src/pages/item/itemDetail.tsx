import { ClientItemDb } from "@/utils/helper/type";
import Button from "@/utils/components/Button";
import { calcAverage } from "@/analysis/isOptimalValue";
import { getPriceArray, getValueForDate } from "@/firebase/firestore/dbFetcher";
import { today } from "@/pages/item/helper/timeUtils";

type ItemDetailProps = {
  item: ClientItemDb;
  onClose: () => void;
};

const ItemDetail = ({ item, onClose }: ItemDetailProps) => {
  if (!item) {
    return null;
  }
  const todayPrice = getValueForDate(item, today());
  const averageValue = calcAverage(getPriceArray(item));

  const diffPrice = () => {
    if (todayPrice === null) {
      return "価格を取得できませんでした";
    }
    return todayPrice - calcAverage(getPriceArray(item));
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <img src={item.imageId} alt="" />
        <p className="font-bold text-xl p-3">{item.itemName}</p>
      </div>
      <div className="flex flex-row justify-between">
        <p>今日の金額:</p>
        <p>{todayPrice}円</p>
      </div>
      <div className="flex flex-row justify-between">
        <p>普段の金額:</p>
        <p>{averageValue}円</p>
      </div>
      <div className="flex flex-row justify-between">
        <p>価格差:</p>
        <p>{diffPrice()}円</p>
      </div>
      <div className="flex flex-ro justify-between">
        <p>カテゴリー</p>
        <p>飲み物</p>
      </div>

      <div className="flex flex-row justify-between absolute bottom-10 left-2 right-2">
        <Button className="w-2/5" label="キャンセル" func={() => onClose()} />
        <Button
          className="w-2/5"
          label="更新"
          func={() => {
            console.log("更新ボタンが押されました");
          }}
        />
      </div>
    </div>
  );
};

export default ItemDetail;
