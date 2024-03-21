import { NumberOrNull } from "@/utils/helper/type";

// const isOptimalValue = (prices: number[], DeadlineArrays: number) => {
//   /**
//    * prices: [1日目の値, 2日目の値, ..., n日目の値] 日ごとにソートされているものとする
//    */
//   const discardedCriteria = DeadlineArrays / Math.exp(1);
//   if (discardedCriteria > prices.length) {
//     return false;
//   }
//   if (Math.min(...prices) === prices[prices.length - 1]) {
//     return true;
//   }
// };

// export const calcAverage = (prices: NumberOrNull) => {
//   return prices.reduce((acc, cur) => acc + cur, 0) / prices.length;
// }

export const calcAverage = (prices: NumberOrNull[]) => {
  const validPrices = prices.filter(price => price !== null) as number[];
  const sum = validPrices.reduce((acc, cur) => acc + cur, 0);
  const average = sum / validPrices.length;
  return average;
}

export const displayPriceDiffFromAverage = (prices: NumberOrNull[], price:NumberOrNull) => {
  const average = calcAverage(prices);
  if (price === null) {
    return "価格が取得できませんでした";
  }
  const priceDiff = price - average;
  if (priceDiff > 0) {
    return `${priceDiff}円高い`;
  } else {
    return `${-priceDiff}円安い`;
  }
}
