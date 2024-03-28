import { useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/init";
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
  const [img, setImg] = useState<string>("");
  if (!item) {
    return null;
  }
  const todayPrice = getValueForDate(item, today());
  const averageValue = calcAverage(getPriceArray(item));
  const storageRef = ref(
    storage,
    "gs://economeye-d5146.appspot.com/tags/red.svg"
  );
  getDownloadURL(storageRef).then((url) => {
    setImg(url);
  });
  const diffPrice = () => {
    if (todayPrice === null) {
      return "価格を取得できませんでした";
    }
    return todayPrice - calcAverage(getPriceArray(item));
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-start items-end mb-8">
        <img src={item.imageId} className="w-20 h-20" alt="itemImage" />
        <div className="flex flex-col ml-6 mb-2">
          <div className="border-b">
            <p className="font-bold text-sm">{item.itemName}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-4">
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
        <div className="flex flex-row justify-between">
          <p>URL:</p>
          <a href={item.url} className="underline">
            商品URLはこちら
          </a>
        </div>
        <div className="flex flex-row justify-between">
          <p>カテゴリ名</p>
          <div className="flex flex-row items-center">
            <img className="w-6 h-6 mr-2" src={img} alt="" />
            <p className="text-right max-w-28">飲み物</p>{" "}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between absolute bottom-48 left-2 right-2">
        <Button className="w-1/4" label="キャンセル" func={() => onClose()} />
        <Button
          className="w-1/4"
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