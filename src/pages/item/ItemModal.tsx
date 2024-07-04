import { getPriceArray, getPriceValueOnDate } from "@/pages/item/dbFetcher";
import ModalHeader from "@/pages/item/ModalHeader";
import DiffFromAverage from "@/pages/item/DiffFromAverage";
import Button from "@/components/Button";
import { formatAverage } from "@/calculation/calcValue";
import PriceTransition from "@/chart/PriceTransition";
import { UserItemData } from "@/utils/types/items";
import { today } from "@/utils/timeUtils";

type ItemDetailProps = {
  item: UserItemData;
  onClose: () => void;
};

const ItemModal = ({ item, onClose }: ItemDetailProps) => {
  if (!item) {
    return null;
  }
  const todayPrice = getPriceValueOnDate(item, today());
  const averagePrice = formatAverage(getPriceArray(item));

  return (
    <div className="flex flex-col justify-between gap-4 bg-white">
      <div className="flex flex-col gap-4">
        <ModalHeader item={item} />
        <div className="flex flex-1 flex-col items-center justify-around">
          <div className="flex items-end gap-8">
            <div>
              <div>今日は</div>
              <p className="text-5xl">{todayPrice}円</p>
            </div>
            <div>
              <div>普段は</div>
              <p className="text-4xl">{averagePrice}円</p>
            </div>
          </div>
          <DiffFromAverage
            style="text-3xl"
            prices={getPriceArray(item)}
            price={todayPrice}
          />
        </div>
        <PriceTransition item={item} />
      </div>
      <div className="flex flex-row justify-around">
        <Button style="w-2/5" label="閉じる" func={() => onClose()} />
        <Button
          style="w-2/5 bg-orange-200"
          label="購入"
          func={() => {
            window.open(item.url);
          }}
        />
      </div>
    </div>
  );
};

export default ItemModal;
