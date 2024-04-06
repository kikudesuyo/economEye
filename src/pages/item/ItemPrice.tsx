import Input from "@/components/Input";
import { useState } from "react";
import { UserItemData } from "@/utils/type";
import Button from "@/components/Button";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/init";
import { DataUpdater } from "@/firebase/firestore/updateItem";

type Props = {
  item: UserItemData;
};

const ItemPrice = ({ item }: Props) => {
  const [itemName, setItemName] = useState<string>(item.itemName);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [img, setImg] = useState<string>("");
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
    <div className="flex items-center justify-between border-b-2 border-stone-300">
      <img src={item.imageId} className="size-28 " alt="itemImage" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-end gap-1">
          <img className="size-6" src={img} alt="" />
          <p>飲み物</p>
        </div>
        <div className="flex">
          {canEdit ? (
            <>
              <Input
                handler={(e) => setItemName(e.target.value)}
                label="✎"
                style="text-3xl items-center"
                placeholder="商品名を入力してください"
                type="text"
                value={itemName}
              />
              <Button
                label="保存"
                func={async () => {
                  setCanEdit(false);
                  await updateItemName();
                }}
              />
            </>
          ) : (
            <div className="flex gap-4">
              <p className="text-3xl">{itemName}</p>
              <Button
                label="編集"
                func={() => {
                  setCanEdit(true);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemPrice;
