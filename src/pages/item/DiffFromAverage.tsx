import {
  calcDeviationFromAverage,
  formatAverage,
} from "@/pages/item/calcValue";
import { ItemPriceValue } from "@/utils/types/items";

type Props = {
  style?: string;
  prices: ItemPriceValue[];
  price: ItemPriceValue;
};

const DiffFromAverage = ({ style = "", prices, price }: Props) => {
  const average = formatAverage(prices);
  const diff = calcDeviationFromAverage(average, price);
  if (diff === null) {
    return <p className={`${style}`}>データがありません</p>;
  } else if (diff > 0) {
    return <p className={`${style}`}>普段より{diff}円高い</p>;
  } else if (diff < 0) {
    return <p className={`${style}`}>普段より{Math.abs(diff)}円安い</p>;
  }
  return <p className={`${style}`}>±0円</p>;
};

export default DiffFromAverage;
