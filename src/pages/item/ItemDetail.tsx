import { UserItemData } from "@/utils/types/items";
import Button from "@/components/Button";
import { getPriceArray, getValueForDate } from "@/firebase/firestore/dbFetcher";
import { today } from "@/utils/timeUtils";
import DiffFromAverage from "@/pages/item/DiffFromAverage";
import { formattedAverage } from "@/calculation/calcValue";
import PriceTransition from "@/chart/PriceTransition";
import ItemPrice from "@/pages/item/ItemPrice";

type ItemDetailProps = {
  item: UserItemData;
  onClose: () => void;
};

const ItemDetail = ({ item, onClose }: ItemDetailProps) => {
  if (!item) {
    return null;
  }
  const todayPrice = getValueForDate(item, today());
  const averagePrice = formattedAverage(getPriceArray(item));

  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <div className="flex flex-1 flex-col">
        <ItemPrice item={item} />
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
      </div>
      <PriceTransition item={item} />
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

export default ItemDetail;
