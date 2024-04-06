import { calcPriceDiffFromAverage } from "@/analysis/calcValue";
import { ItemPriceValue } from "@/utils/type";

type Props = {
  style?: string;
  prices: ItemPriceValue[];
  price: ItemPriceValue;
};

const DiffFromAverage = ({ style = "", prices, price }: Props) => {
  const diff = calcPriceDiffFromAverage(prices, price);
  const getDisplayText = (): string => {
    if (diff === null) {
      return "データがありません";
    } else if (diff > 0) {
      return `普段より${diff}円高い`;
    } else if (diff < 0) {
      return `普段より${diff}円安い`;
    }
    return "±0円";
  };
  return <p className={`${style}`}>{getDisplayText()}</p>;
};

export default DiffFromAverage;
