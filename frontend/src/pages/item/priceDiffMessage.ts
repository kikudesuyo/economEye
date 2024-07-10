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

export const displayPriceDiffMessage = ({ prices, price }: Props) => {
  const average = formatAverage(prices);
  const diff = calcDeviationFromAverage(average, price);
  if (diff === null) {
    return "データがありません";
  } else if (diff > 0) {
    return `普段より${diff}円高い`;
  } else if (diff < 0) {
    return `普段より${Math.abs(diff)}円安い`;
  }
  return "±0円";
};
