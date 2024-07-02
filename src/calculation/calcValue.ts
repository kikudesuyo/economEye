import { ItemPriceValue } from "@/utils/types/items";

export const formatValue = (value: number): number => {
  return Math.round(value);
};

export const calcAverage = (prices: ItemPriceValue[]) => {
  const validPrices = prices.filter((price) => price !== null) as number[];
  const sum = validPrices.reduce((acc, cur) => acc + cur, 0);
  const average = sum / validPrices.length;
  return average;
};

export const formattedAverage = (prices: ItemPriceValue[]) => {
  const average = calcAverage(prices);
  return formatValue(average);
};

export const calcDeviationFromAverage = (
  average: number,
  price: ItemPriceValue
) => {
  if (price === null) return null;
  return price - average;
};
