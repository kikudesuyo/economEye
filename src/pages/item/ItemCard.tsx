import { today } from "@/utils/timeUtils";
import DiffFromAverage from "@/pages/item/DiffFromAverage";
import {
  getPriceValueOnDate,
  getPriceArray,
} from "@/firebase/firestore/dbFetcher";
import { UserItemData } from "@/utils/type";
import Button from "@/components/Button";

type Props = {
  item: UserItemData;
  openModal: () => void;
};

const ItemCard = ({ item, openModal }: Props) => {
  return (
    <div
      className="flex cursor-pointer flex-col items-center justify-between gap-2 border-2 border-slate-300 p-3"
      onClick={openModal}
    >
      <img src={item.imageId} alt="" className="w-3/5" />
      <div className="flex flex-col items-center gap-1">
        <p className="max-w-full truncate font-bold">{item.itemName}</p>
        <p className="max-w-full truncate">
          {getPriceValueOnDate(item, today())}円
        </p>
        <DiffFromAverage
          prices={getPriceArray(item)}
          price={getPriceValueOnDate(item, today())}
          style="text-sm"
        />
      </div>
      <Button label="開く" func={() => {}} style="w-3/5 py-1" />
    </div>
  );
};

export default ItemCard;
