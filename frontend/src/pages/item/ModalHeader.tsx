import { useState } from "react";

import { DbDocumentManager } from "@/firebase/firestore/dbManage";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { UserItemData } from "@/utils/types/items";
import red from "@/assets/imgs/tags/red.svg";

type Props = {
  item: UserItemData;
};

const ModalHeader = ({ item }: Props) => {
  const [itemName, setItemName] = useState<string>(item.itemName);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const updateItemName = async () => {
    const updater = new DbDocumentManager(item.itemRef);
    await updater.updateSpecificFields({ itemName: itemName });
  };

  return (
    <div className="flex items-center justify-between border-b-2 border-stone-300">
      <img src={item.imageId} className="size-28 " alt="itemImage" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-end gap-1">
          <img className="size-6" src={red} alt="" />
          <p>タグ</p>
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

export default ModalHeader;
