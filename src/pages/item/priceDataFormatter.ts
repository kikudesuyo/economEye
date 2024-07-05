import { ItemData, ItemPriceValue } from "@/utils/types/items";

export const getPriceValueOnDate = (itemData: ItemData, targetDate: string) => {
  const price = itemData.prices.find((price) => price.date === targetDate);
  return price ? price.value : null;
};

interface PriceEntry {
  date: string;
  value: ItemPriceValue;
}

export const getPriceArray = (itemData: ItemData): ItemPriceValue[] => {
  const prices = itemData.prices;
  const sortByDate = (a: PriceEntry, b: PriceEntry): number => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  };
  prices.sort(sortByDate);
  const values: ItemPriceValue[] = prices.map((entry) => entry.value);
  return values;
};
