import {
  getPriceValueOnDate,
  getPriceArray,
} from "@/pages/item/priceDataFormatter";
import { displayPriceDiffMessage } from "@/pages/item/priceDiffMessage";
import Button from "@/components/Button";
import { today } from "@/utils/timeUtils";
import { UserItemData } from "@/utils/types/items";

type Props = {
  item: UserItemData;
  openModal: () => void;
};

const ItemCard = ({ item, openModal }: Props) => {
  return (
    <div
      className="flex cursor-pointer flex-col items-center justify-between gap-2 rounded-md border-2 border-gray-300 p-3 hover:bg-gray-200"
      onClick={openModal}
    >
      <img src={item.imageId} alt="" className="w-3/5" />
      <div className="flex flex-col items-center gap-1">
        <p className="max-w-full truncate font-bold">{item.itemName}</p>
        <p className="max-w-full truncate">
          {getPriceValueOnDate(item, today())}円
        </p>
        <div className="text-sm">
          {displayPriceDiffMessage({
            prices: getPriceArray(item),
            price: getPriceValueOnDate(item, today()),
          })}
        </div>
      </div>
      <Button label="開く" func={() => {}} style="w-3/5 py-1" />
    </div>
  );
};

export default ItemCard;
