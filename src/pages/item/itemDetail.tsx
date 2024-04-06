import { useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/init";
import { UserItemData } from "@/utils/type";
import Button from "@/components/Button";
import { getPriceArray, getValueForDate } from "@/firebase/firestore/dbFetcher";
import { DataUpdater } from "@/firebase/firestore/updateItem";
import { today } from "@/utils/timeUtils";
import DiffFromAverage from "@/pages/item/DiffFromAverage";
import { formattedAverage } from "@/analysis/calcValue";
import Input from "@/components/Input";

type ItemDetailProps = {
  item: UserItemData;
  onClose: () => void;
};

const ItemDetail = ({ item, onClose }: ItemDetailProps) => {
  const [itemName, setItemName] = useState<string>(item.itemName);
  const [img, setImg] = useState<string>("");
  if (!item) {
    return null;
  }
  const todayPrice = getValueForDate(item, today());
  const averagePrice = formattedAverage(getPriceArray(item));
  const storageRef = ref(
    storage,
    "gs://economeye-d5146.appspot.com/tags/red.svg"
  );
  getDownloadURL(storageRef).then((url) => {
    setImg(url);
  });

  const updateItemName = async () => {
    const updater = new DataUpdater("items", item.itemId);
    await updater.updatePartialData({ itemName: itemName });
  };

  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between border-b-2 border-stone-300">
          <img src={item.imageId} className="size-20" alt="itemImage" />
          <Input
            handler={(e) => setItemName(e.target.value)}
            label="商品名:"
            placeholder="商品名を入力してください"
            style="flex flex-row gap-4"
            type="text"
            value={itemName}
          />
        </div>
        <div className="flex flex-col justify-between gap-4">
          <div className="flex flex-row justify-between">
            <p className="cursor-auto">今日の金額:</p>
            <p>{todayPrice}円</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>普段の金額:</p>
            <p>{averagePrice}円</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>価格差:</p>
            <DiffFromAverage
              style="text-right"
              prices={getPriceArray(item)}
              price={todayPrice}
            />
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
              <img className="mr-2 size-6" src={img} alt="" />
              <p className="max-w-28 text-right">飲み物</p>{" "}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-around">
        <Button style="w-2/5" label="キャンセル" func={() => onClose()} />
        <Button
          style="w-2/5"
          label="更新"
          func={async () => {
            await updateItemName();
            onClose();
          }}
        />
      </div>
    </div>
  );
};

export default ItemDetail;
