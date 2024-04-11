import { useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/init";
import { UserItemData } from "@/utils/type";
import Button from "@/components/Button";
import { getPriceArray, getValueForDate } from "@/firebase/firestore/dbFetcher";
import { DbFieldManager } from "@/firebase/firestore/updateItem";
import { today } from "@/utils/timeUtils";
import DiffFromAverage from "@/pages/item/DiffFromAverage";
import { formattedAverage } from "@/calculation/calcValue";
import Input from "@/components/Input";
import Row from "@/pages/item/Row";
import PriceTransition from "@/chart/PriceTransition";

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
    const updater = new DbFieldManager("items", item.itemId);
    await updater.updateSpecificFields({ itemName: itemName });
  };
  return (
    <div className="flex h-full flex-col gap-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between border-b-2 border-stone-300">
          <img src={item.imageId} className="size-20 " alt="itemImage" />
          <Input
            handler={(e) => setItemName(e.target.value)}
            containerStyle="text-2xl items-center"
            label="商品名:"
            labelStyle="text-xl"
            placeholder="商品名を入力してください"
            type="text"
            value={itemName}
          />
        </div>
        <div className="flex flex-col justify-between gap-4">
          <Row label="今日の金額:">
            <p>{todayPrice}円</p>
          </Row>
          <Row label="普段の金額:">
            <p>{averagePrice}円</p>
          </Row>
          <Row label="価格差:">
            <DiffFromAverage
              style="text-right"
              prices={getPriceArray(item)}
              price={todayPrice}
            />
          </Row>
          <Row label="URL:">
            <a href={item.url} className="underline">
              商品URLはこちら
            </a>
          </Row>
          <Row label="カテゴリ名:">
            <div className="flex items-center gap-1">
              <img className="size-6" src={img} alt="" />
              <p>飲み物</p>
            </div>
          </Row>
        </div>
      </div>
      <PriceTransition item={item} />
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
