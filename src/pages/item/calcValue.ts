import { ItemPriceValue } from "@/utils/types/items";

const calcAverage = (prices: ItemPriceValue[]) => {
  const validPrices = prices.filter((price) => price !== null) as number[];
  const sum = validPrices.reduce((acc, cur) => acc + cur, 0);
  return sum / validPrices.length;
};

export const formatAverage = (prices: ItemPriceValue[]) => {
  const average = calcAverage(prices);
  return Math.round(average);
};

export const calcDeviationFromAverage = (
  average: number,
  price: ItemPriceValue
) => {
  if (price === null) return null;
  return price - average;
};
